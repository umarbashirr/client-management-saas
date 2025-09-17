# System Algorithms & Architecture Blueprint

This document outlines the core algorithms and system patterns for the Cliently SaaS platform. Each user action maps to a specific algorithm that serves as a blueprint for API endpoints and server flows.

## Table of Contents

1. [Core User Flows](#core-user-flows)
2. [Permission & Security](#permission--security)
3. [Data Management](#data-management)
4. [Communication & Collaboration](#communication--collaboration)
5. [Financial Operations](#financial-operations)
6. [Search & Indexing](#search--indexing)
7. [Notifications & Real-time](#notifications--real-time)
8. [Audit & Compliance](#audit--compliance)
9. [System Operations](#system-operations)
10. [Scalability & Performance](#scalability--performance)

---

## Core User Flows

### 1. Create Workspace (Admin Onboarding)

**Goal**: Create workspace, admin user, default settings, trial plan.

**Input**: `{userEmail, password, workspaceName, companyInfo}`

**Algorithm**:

```
1. Validate email format and password policy
2. Start DB transaction
3. Create User record (hashed password), status = active
4. Create Workspace record with name, ownerUserId = user.id, plan = trial
5. Create WorkspaceUser linking user to workspace with role = admin
6. Initialize workspace defaults: timezone, currency, invoiceNumberSeed, retentionPolicy
7. Create audit log entry: workspace.created
8. Commit transaction
9. Send verification email + welcome email (queue email.send job)
10. Return success with workspaceId and first-run onboarding token
```

**Edge Cases**:

- Email exists in another workspace: allow multi-workspace or redirect to sign-in
- Transaction failure: rollback and return safe error

**Events**: `workspace.created`, `user.invited|created`

---

### 2. Invite Team Member

**Goal**: Invite and assign role to team members.

**Input**: `{inviteeEmail, role, permissions}`

**Algorithm**:

```
1. Validate inviter has permission invite_user in workspace
2. Create Invite record with unique token, expiredAt = now + 7d, status = pending
3. Send email with invite link (queue email.send job)
4. Create audit log invite.created
5. If invitee signs up via token:
   - Validate token, link user to workspace by creating WorkspaceUser
   - If user exists: attach workspace immediately
   - Set Invite.status = accepted
   - Emit user.joined_workspace event
```

**Edge Cases**:

- Re-invite same email: create/replace token, update expiry
- Accepting after expiry: return error and let admin re-invite

---

## Permission & Security

### 3. Permission Check (Core Auth Guard)

**Goal**: Centralized permission checks for every protected endpoint.

**Algorithm**:

```
1. Extract session → get userId, workspaceId, roles
2. Fetch WorkspaceUser role/permissions cache (Redis/memory)
3. Determine required permission(s) for endpoint
4. If is_admin OR permissions includes required → allow
5. Else if resource is tenant-scoped, verify resource.workspaceId == session.workspaceId
6. If deny → return 403 and audit log access.denied
```

**Notes**:

- Keep permission mapping in code + DB for dynamic additions
- Use short TTL caches for permissions; invalidate on role changes

---

## Data Management

### 4. Create Client

**Goal**: Create client record tied to workspace.

**Input**: `{name, contacts[], billingInfo, tags}`

**Algorithm**:

```
1. Permission check client.create
2. Validate contact emails/phones format
3. Start DB transaction
4. Create Client with workspaceId
5. Create ClientContact rows for each contact
6. Index client into search index (enqueue search.index.client)
7. Commit transaction
8. Audit log client.created
9. Return client data
```

**Edge Cases**:

- Duplicate client detection: when name + primary domain/email matches, prompt merge/confirm

---

### 5. Create Project

**Goal**: Create project workspace with members.

**Input**: `{clientId, title, description, startDate, endDate, teamMembers[], clientContacts[]}`

**Algorithm**:

```
1. Permission check project.create
2. Validate clientId.workspaceId == workspaceId
3. Start DB transaction:
   - Create Project row (workspaceId, clientId)
   - Create ProjectMember entries for each invited person
   - Create default Task templates if requested
4. Emit project.created event
5. Commit transaction
6. Add pinned Announcement: "Project created by X"
7. Notify project members (enqueue notify.project.join jobs)
8. Return project details
```

**Notes**:

- For external agencies: create ExternalParticipant entities (email only)
- Allow limited access via email invitations (client role)

---

## Communication & Collaboration

### 6. Project Communication: Post Message & Threading

**Goal**: Support threaded chat tied to a project, with files and mentions.

**Input**: `{projectId, authorId, content, attachments[], threadParentId = null}`

**Algorithm**:

```
1. Permission check: user has access to project
2. Validate content size, sanitize HTML for XSS
3. If attachments:
   - Validate each file type/size
   - Upload to file storage → return file references
   - Create File records (workspaceId, owner, projectId)
4. Start DB transaction:
   - Create Message row with {projectId, authorId, content, parentId, createdAt}
   - For each attachment add MessageAttachment rows
5. Commit transaction
6. Emit message.created event
7. Realtime push: publish to websocket topic workspace:{workspaceId}:project:{projectId}
8. Notify watchers/followers (enqueue notify.message.created jobs)
9. Update project "lastActivityAt" timestamp
10. Index message content for search
```

**Threading**:

- `parentId` references top-level message
- Support `isPinned`, `isAnnouncement`
- Message editing/deleting with audit trail

**Edge Cases**:

- File virus scanning: mark status = pending_scan, remove if virus found
- Idempotency: accept idempotency key for retries

---

### 7. File Upload & Management

**Goal**: Central file repo with versioning and project associations.

**Input**: `{projectId, uploaderId, file stream}`

**Algorithm**:

```
1. Validate uploader access to project
2. Generate unique file key and presigned URL for upload
3. Save metadata row File (workspaceId, projectId, uploaderId, filename, size, mime, storageKey, version = 1)
4. Queue file.scan job (virus/malware)
5. Queue file.extract.text job for OCR/search indexing
6. Emit file.uploaded event
7. Show file in Files tab with status = scanning until complete
```

**Versioning**:

- Re-upload same filename: create new File with version++
- Keep link from message/task to specific fileId

**Retention**:

- Respect workspace retentionPolicy
- Scheduled purge job for expired files

---

### 8. Task CRUD & Assignment

**Goal**: Tasks assigned to workspace users or client contacts.

**Create Task Input**: `{projectId, title, description, assignees[], dueDate, priority, parentTaskId}`

**Algorithm**:

```
1. Permission check task.create
2. Validate assignees exist / are project members
3. Start DB transaction: create Task record; create TaskAssignment rows
4. Emit task.created event
5. Notify assignees (email + in-app)
```

**Update Task**:

```
1. Permission check task.update
2. Update Task row; append TaskActivity (comment or status change)
3. Emit task.updated and push realtime update
4. If status == done and task has recurrence: schedule next occurrence
```

**Edge Cases**:

- Bulk update: use batch transactions
- Task dependencies: enforce cannot mark complete unless blockers resolved

---

## Financial Operations

### 9. Create Invoice, Generate PDF, and Send

**Goal**: Produce legally consistent invoice PDF, store it, and send to client.

**Create Invoice Input**: `{clientId, projectId?, lineItems[], tax, discount, dueDate, currency}`

**Algorithm**:

```
1. Permission check invoice.create
2. Validate client/project belong to workspace
3. Start DB transaction:
   - Reserve invoice number (atomic sequence)
   - Create Invoice row (status = DRAFT)
   - Create InvoiceLineItem rows
4. Commit transaction
5. Queue invoice.generate_pdf job with invoiceId
```

**Generate PDF**:

```
1. Fetch invoice data, client billing details, workspace company info
2. Render PDF with embedded invoice number, dates, totals
3. Store PDF in file storage, create File record linked to invoice
4. Update Invoice.pdfUrl
5. Emit invoice.pdf.generated
```

**Send Invoice**:

```
1. Permission check invoice.send
2. If invoice status == DRAFT, update to SENT, set sentAt = now
3. Queue email.send job with invoice PDF attachment
4. Emit invoice.sent event and notify workspace admins
5. When payment received: update Invoice.status = PAID
```

**Edge Cases**:

- Failed PDF generation: retry with exponential backoff
- Invoice number collisions: sequence should be atomic in DB
- Idempotency: ensure invoice.send is idempotent

---

### 10. Payments & Webhook Handling (Stripe)

**Goal**: Accept payments and reconcile invoice statuses.

**Algorithm**:

```
1. Create Payment Intent referencing invoiceId
2. On payment success webhook from Stripe:
   - Validate signature
   - Find workspace by stripe account id
   - Find PaymentIntent → determine invoiceId
   - Start DB transaction:
     - Create Payment record with amount, currency, providerTransactionId
     - Update Invoice paidAmount and set status PAID if full
     - Create InvoicePayment linking payment to invoice
   - Commit transaction
   - Emit payment.received event
   - Notify client & workspace admin
```

**Edge Cases**:

- Duplicate webhook events: ensure idempotency by checking providerTransactionId
- Reconcile mismatches in nightly job

---

## Search & Indexing

### 11. Search & Indexing Algorithm

**Goal**: Fast, relevant search across clients/projects/messages/files.

**Indexing**:

```
1. Identify indexable entities: Client, Project, Task, Invoice, Message, FileText
2. On create/update/delete:
   - Emit index.enqueue event with {entityType, id, workspaceId}
   - Worker fetches full content, normalizes text, tokenizes
   - Index into search engine with fields: title, body, tags, createdAt, projectId, clientId, permissionsSnapshot
```

**Query Time**:

```
1. Accept search query + workspaceId + userId
2. Apply workspace filter (tenant isolation)
3. Optionally apply ACL filter using permissionsSnapshot
4. Return results with highlighted snippets and facet counts
```

**Security**:

- Never index private content unless workspace-level ACLs enforced
- Store result ACL metadata

---

## Notifications & Real-time

### 12. Notifications & Digests

**Goal**: Real-time & email notifications with digesting.

**Realtime**:

```
1. For each event emit to pub/sub and push to WebSocket topic
2. If user is online: show realtime in-app notification
```

**Email**:

```
1. If user is offline or notifies by email: build notification email
2. For high-frequency events: use digest strategy (collect for 10-15 minutes)
3. Provide user settings for immediate or digest emails
```

**Edge Cases**:

- Avoid spam: if user is author or muted, suppress notifications

---

## Audit & Compliance

### 13. Audit Log & Activity Timeline

**Goal**: Immutable audit trail per workspace.

**Algorithm**:

```
1. For every mutating action, write AuditLog entry: {workspaceId, actorId, action, targetType, targetId, metadata, timestamp}
2. Store logs in append-only table optimized for writes
3. Provide UI for ActivityLog per client/project filtered by targetId
4. For sensitive operations: require admin 2FA confirmation
```

**Retention**:

- Follow compliance: keep audit longer than normal data
- Configurable retention periods

---

### 14. Data Deletion & Archival

**Goal**: Soft deletion, archival, GDPR compliance.

**Algorithm**:

```
1. Soft delete: mark deletedAt and set status=archived
2. Add purgeAt = now + retentionPeriod
3. Scheduled job to permanently delete after purgeAt
4. Before deletion: create backup snapshot
5. For data export (GDPR): generate archive (zip of JSON & files)
6. For full account deletion: remove workspace, notify users, revoke tokens, purge after 30 days
```

**Edge Cases**:

- When user restores archived workspace within retention, cancel purge job

---

## System Operations

### 15. Concurrency, Transactions & Idempotency Patterns

**Guidelines**:

- Use DB transactions for multi-table writes that must be atomic
- Use optimistic locking for concurrent edits
- For external systems: use idempotency keys
- For background jobs: use exponential backoff and poison queue handling
- Reserve numeric sequences with atomic operations

---

### 16. Realtime Architecture

**Flow**:

```
1. Client connects to WebSocket with session token
2. On message.created, server writes DB then publishes to Redis channel
3. WebSocket servers forward event to authorized connected clients
4. Fallback to long-polling or SSE for clients without WebSocket
```

**Security**:

- Authorize connection by session + workspace membership

---

### 17. Integrations (Email/Slack/Gmail)

**Gmail Integration**:

```
1. User connects Gmail via OAuth; store refresh tokens encrypted
2. On new incoming email: fetch via Gmail API
3. Parse recipient and determine workspaceId or projectId
4. Create Message/Email record in project with attachments
5. Notify participants
```

**Slack/Teams**:

- Allow forwarding channel messages to project discussions
- Map Slack thread → Message thread

---

### 18. Error Handling & Monitoring

**Logging**:

- Centralized structured logs (ELK/Vector)
- Correlate logs by workspaceId, requestId, userId

**Monitoring**:

- Track: API latency, error rates, queue depth, job failure rates, storage usage
- Alerting: pages on high error rates, failed payments, virus detections

**SLA**:

- Retry/backoff for transient errors
- Circuit breaker for downstream services

---

### 19. Backups & DR

**Strategy**:

- Daily DB logical backups, weekly full snapshots stored offsite
- File storage: cross-region replication
- Test restore quarterly: ensure backups are restorable within RTO targets

---

## Scalability & Performance

### 20. Scalability & Sharding Considerations

**Multitenancy Scale**:

- Start with single DB with workspaceId filter
- If scale demands: range-shard by workspaceId or dedicated DB per large customer
- Use read replicas for heavy read ops
- Use caching (Redis) for hot reads: permission caches, recent activity

**Indexing**:

- Separate search cluster, shard by workspace or per-tenant index prefix

---

### 21. Security Best Practices

**Implementation**:

- Encrypt sensitive fields at rest
- Use TLS everywhere
- Rate limit APIs per workspace and per IP
- Credential rotation for integration tokens
- Implement 2FA for admins
- CSP / sanitize all user inputs
- Verify webhooks (signature verification)
- Regular vulnerability scans and dependency updates

---

### 22. Event Map

**Core Events**:

- `workspace.created`
- `user.invited`, `user.joined_workspace`
- `client.created`, `client.updated`
- `project.created`, `project.updated`
- `message.created`, `message.deleted`, `message.edited`
- `file.uploaded`, `file.scan.completed`
- `task.created`, `task.updated`
- `invoice.created`, `invoice.pdf.generated`, `invoice.sent`, `invoice.paid`
- `payment.received`
- `search.index.enqueued`

These events feed realtime layer, notifications, search indexer, and audit.

---

### 23. Operational Algorithms for Common Problems

**A. Handling Spam/DOS**:

- Rate limit message posts per user per project (1 msg/sec, burst 5)
- If user exceeds limits: mute for short period and notify admin

**B. New Member History Access**:

- When external participant joins: grant read access based on workspace policy
- Decision: show full history OR only messages after join date

**C. Merging Duplicate Clients**:

- Find duplicates by domain/email/name fuzziness
- Present merged preview showing field conflicts
- User resolves conflicts
- Apply merge in transaction: reassign projects/invoices/tasks/messages to surviving clientId

---

### 24. Data Model Notes (Prisma-friendly)

**Key Models**:

- `Workspace`
- `User`
- `WorkspaceUser` (role, permissions)
- `Client`
- `ClientContact`
- `Project`
- `ProjectMember` (user/external participant)
- `Message` (projectId, parentId)
- `File`
- `Task`
- `Invoice`, `InvoiceLineItem`
- `Payment`
- `AuditLog`

**Note**: Each model includes `workspaceId` for tenant isolation.

---

### 25. Testing & QA Algorithm

**Test Strategy**:

- Unit tests for permission checks
- Integration tests: invoice creation → PDF generation → send → payment webhook reconciliation
- E2E tests for collaboration flows: invite user → create project → post messages → upload files → new member sees history
- Load tests: simulate X concurrent projects posting messages and file uploads

---

## Implementation Priority

### Phase 1 (Foundation)

1. Workspace creation & user management
2. Permission system
3. Basic client/project CRUD
4. Authentication & session management

### Phase 2 (Collaboration)

5. Message system & threading
6. File upload & management
7. Task management
8. Search & indexing

### Phase 3 (Business Operations)

9. Invoice creation & PDF generation
10. Payment processing
11. Audit logging
12. Notifications & real-time

### Phase 4 (Advanced Features)

13. Integrations
14. Advanced analytics
15. Compliance & data management
16. Scalability optimizations

---

_This document serves as the architectural blueprint for the Cliently SaaS platform. Each algorithm should be implemented as corresponding API endpoints and server flows._
