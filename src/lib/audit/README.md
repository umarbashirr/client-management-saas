# Audit Log System

This audit log system provides comprehensive tracking of user activities, authentication events, and system operations for your client management SaaS application.

## Features

- **Comprehensive Tracking**: Logs authentication events, user actions, organization activities, and more
- **Multi-tenant Support**: Tracks activities within organization contexts
- **Rich Metadata**: Stores additional context like IP addresses, user agents, and custom data
- **Performance Optimized**: Indexed for fast queries and pagination
- **Admin Interface**: Built-in components for viewing and filtering audit logs
- **API Endpoints**: RESTful API for programmatic access

## Database Schema

The `AuditLog` model includes:

- **Core Fields**: `id`, `userId`, `action`, `resource`, `resourceId`
- **Context**: `ipAddress`, `userAgent`, `sessionId`
- **Metadata**: `status`, `message`, `metadata` (JSON)
- **Timestamps**: `createdAt`
- **Multi-tenancy**: `organizationId`, `targetUserId`

## Usage

### 1. Basic Audit Logging

```typescript
import { AuditLogService } from "@/lib/audit/audit-log";

// Log a custom event
await AuditLogService.create({
  userId: "user123",
  action: "client.create",
  resource: "client",
  resourceId: "client456",
  status: "success",
  message: "Client created successfully",
  metadata: { clientName: "Acme Corp" },
  organizationId: "org789",
});
```

### 2. Authentication Events

```typescript
import { AuthAuditMiddleware } from "@/lib/audit/auth-audit-middleware";

// Log sign in
await AuthAuditMiddleware.logSignIn({
  userId: "user123",
  email: "user@example.com",
  sessionId: "session456",
  metadata: { provider: "email" },
});

// Log sign out
await AuthAuditMiddleware.logSignOut({
  userId: "user123",
  email: "user@example.com",
  sessionId: "session456",
});
```

### 3. Organization Events

```typescript
// Log organization creation
await AuditLogService.logOrganizationEvent("create", {
  userId: "user123",
  organizationId: "org789",
  status: "success",
  message: "Organization created",
  metadata: { organizationName: "New Org" },
});
```

### 4. Client Management Events

```typescript
// Log client creation
await AuditLogService.logClientEvent("create", {
  userId: "user123",
  organizationId: "org789",
  clientId: "client456",
  status: "success",
  message: "Client created",
  metadata: { clientName: "Acme Corp" },
});
```

### 5. Project Events

```typescript
// Log project assignment
await AuditLogService.logProjectEvent("assign", {
  userId: "user123",
  organizationId: "org789",
  projectId: "project789",
  status: "success",
  message: "Project assigned to user",
  metadata: { assignedTo: "user456" },
});
```

## API Endpoints

### GET /api/audit-logs

Retrieve audit logs with filtering and pagination.

**Query Parameters:**

- `page`: Page number (default: 1)
- `limit`: Items per page (default: 50)
- `userId`: Filter by user ID
- `organizationId`: Filter by organization ID
- `action`: Filter by action (supports partial matching)
- `resource`: Filter by resource type
- `status`: Filter by status (success, failure, pending)
- `startDate`: Filter by start date (ISO string)
- `endDate`: Filter by end date (ISO string)

**Response:**

```json
{
  "logs": [...],
  "total": 1000,
  "page": 1,
  "limit": 50,
  "totalPages": 20
}
```

### GET /api/audit-logs/stats

Get audit log statistics.

**Query Parameters:**

- `organizationId`: Filter by organization ID
- `days`: Number of days to include (default: 30)

**Response:**

```json
{
  "totalLogs": 1000,
  "successLogs": 950,
  "failureLogs": 50,
  "successRate": 95.0,
  "actionStats": [...]
}
```

## React Components

### AuditLogsTable

A comprehensive table component for viewing audit logs with filtering and pagination.

```tsx
import { AuditLogsTable } from "@/components/audit-logs/audit-logs-table";

function AdminPage() {
  return (
    <div>
      <h1>Audit Logs</h1>
      <AuditLogsTable />
    </div>
  );
}
```

## Action Types

### Authentication Actions

- `user.signin` - User sign in
- `user.signup` - User sign up
- `user.signout` - User sign out
- `user.password_reset` - Password reset
- `user.password_change` - Password change
- `user.email_verification` - Email verification

### Organization Actions

- `organization.create` - Organization creation
- `organization.update` - Organization update
- `organization.delete` - Organization deletion
- `organization.invite` - Member invitation
- `organization.remove_member` - Member removal

### Client Actions

- `client.create` - Client creation
- `client.update` - Client update
- `client.delete` - Client deletion
- `client.view` - Client view

### Project Actions

- `project.create` - Project creation
- `project.update` - Project update
- `project.delete` - Project deletion
- `project.view` - Project view
- `project.assign` - Project assignment

## Security Considerations

1. **Access Control**: Only admin users can view audit logs
2. **Data Retention**: Consider implementing data retention policies
3. **Sensitive Data**: Avoid logging sensitive information in metadata
4. **Performance**: Use pagination for large datasets
5. **Privacy**: Ensure compliance with data protection regulations

## Performance Optimization

1. **Indexes**: The schema includes optimized indexes for common queries
2. **Pagination**: Always use pagination for large datasets
3. **Filtering**: Use specific filters to reduce query scope
4. **Archiving**: Consider archiving old logs for better performance

## Integration with Better Auth

The audit system is automatically integrated with Better Auth through hooks that log:

- Successful sign-ins
- Successful sign-ups
- Sign-outs
- Password reset requests

## Customization

You can extend the audit system by:

1. Adding new action types
2. Creating custom audit log methods
3. Adding new metadata fields
4. Implementing custom filtering logic
5. Creating specialized audit log views

## Monitoring and Alerts

Consider implementing:

- Failed authentication attempt monitoring
- Unusual activity detection
- Rate limiting based on audit logs
- Automated alerts for suspicious activities
