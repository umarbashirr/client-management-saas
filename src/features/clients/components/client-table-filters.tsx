"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { X, Filter, Search } from "lucide-react";
import {
  CLIENT_STATUS_OPTIONS,
  CLIENT_PRIORITY_OPTIONS,
  CLIENT_SOURCE_OPTIONS,
} from "../types";

interface ClientTableFiltersProps {
  globalFilter: string;
  setGlobalFilter: (value: string) => void;
  statusFilter: string[];
  setStatusFilter: (value: string[]) => void;
  priorityFilter: string[];
  setPriorityFilter: (value: string[]) => void;
  sourceFilter: string[];
  setSourceFilter: (value: string[]) => void;
  onClearFilters: () => void;
}

export function ClientTableFilters({
  globalFilter,
  setGlobalFilter,
  statusFilter,
  setStatusFilter,
  priorityFilter,
  setPriorityFilter,
  sourceFilter,
  setSourceFilter,
  onClearFilters,
}: ClientTableFiltersProps) {
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const activeFiltersCount =
    statusFilter.length + priorityFilter.length + sourceFilter.length;

  const handleStatusChange = (status: string, checked: boolean) => {
    if (checked) {
      setStatusFilter([...statusFilter, status]);
    } else {
      setStatusFilter(statusFilter.filter((s) => s !== status));
    }
  };

  const handlePriorityChange = (priority: string, checked: boolean) => {
    if (checked) {
      setPriorityFilter([...priorityFilter, priority]);
    } else {
      setPriorityFilter(priorityFilter.filter((p) => p !== priority));
    }
  };

  const handleSourceChange = (source: string, checked: boolean) => {
    if (checked) {
      setSourceFilter([...sourceFilter, source]);
    } else {
      setSourceFilter(sourceFilter.filter((s) => s !== source));
    }
  };

  return (
    <div className="flex items-center space-x-2">
      {/* Global Search */}
      <div className="relative flex-1 max-w-sm">
        <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search clients..."
          value={globalFilter}
          onChange={(e) => setGlobalFilter(e.target.value)}
          className="pl-8"
        />
      </div>

      {/* Filter Dropdown */}
      <DropdownMenu open={isFilterOpen} onOpenChange={setIsFilterOpen}>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="h-9">
            <Filter className="mr-2 h-4 w-4" />
            Filters
            {activeFiltersCount > 0 && (
              <Badge
                variant="secondary"
                className="ml-2 h-5 w-5 rounded-full p-0 text-xs"
              >
                {activeFiltersCount}
              </Badge>
            )}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56">
          <DropdownMenuLabel>Filter by</DropdownMenuLabel>
          <DropdownMenuSeparator />

          {/* Status Filter */}
          <div className="px-2 py-1.5">
            <div className="text-sm font-medium text-muted-foreground mb-2">
              Status
            </div>
            {CLIENT_STATUS_OPTIONS.map((option) => (
              <DropdownMenuCheckboxItem
                key={option.value}
                checked={statusFilter.includes(option.value)}
                onCheckedChange={(checked) =>
                  handleStatusChange(option.value, checked)
                }
              >
                {option.label}
              </DropdownMenuCheckboxItem>
            ))}
          </div>

          <DropdownMenuSeparator />

          {/* Priority Filter */}
          <div className="px-2 py-1.5">
            <div className="text-sm font-medium text-muted-foreground mb-2">
              Priority
            </div>
            {CLIENT_PRIORITY_OPTIONS.map((option) => (
              <DropdownMenuCheckboxItem
                key={option.value}
                checked={priorityFilter.includes(option.value)}
                onCheckedChange={(checked) =>
                  handlePriorityChange(option.value, checked)
                }
              >
                {option.label}
              </DropdownMenuCheckboxItem>
            ))}
          </div>

          <DropdownMenuSeparator />

          {/* Source Filter */}
          <div className="px-2 py-1.5">
            <div className="text-sm font-medium text-muted-foreground mb-2">
              Source
            </div>
            {CLIENT_SOURCE_OPTIONS.map((option) => (
              <DropdownMenuCheckboxItem
                key={option.value}
                checked={sourceFilter.includes(option.value)}
                onCheckedChange={(checked) =>
                  handleSourceChange(option.value, checked)
                }
              >
                {option.label}
              </DropdownMenuCheckboxItem>
            ))}
          </div>

          {activeFiltersCount > 0 && (
            <>
              <DropdownMenuSeparator />
              <div className="px-2 py-1.5">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={onClearFilters}
                  className="w-full justify-start text-muted-foreground"
                >
                  <X className="mr-2 h-4 w-4" />
                  Clear filters
                </Button>
              </div>
            </>
          )}
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Active Filter Tags */}
      {activeFiltersCount > 0 && (
        <div className="flex flex-wrap gap-1">
          {statusFilter.map((status) => {
            const option = CLIENT_STATUS_OPTIONS.find(
              (o) => o.value === status
            );
            return (
              <Badge
                key={status}
                variant="secondary"
                className="text-xs"
                onClick={() => handleStatusChange(status, false)}
              >
                Status: {option?.label}
                <X className="ml-1 h-3 w-3 cursor-pointer" />
              </Badge>
            );
          })}
          {priorityFilter.map((priority) => {
            const option = CLIENT_PRIORITY_OPTIONS.find(
              (o) => o.value === priority
            );
            return (
              <Badge
                key={priority}
                variant="secondary"
                className="text-xs"
                onClick={() => handlePriorityChange(priority, false)}
              >
                Priority: {option?.label}
                <X className="ml-1 h-3 w-3 cursor-pointer" />
              </Badge>
            );
          })}
          {sourceFilter.map((source) => {
            const option = CLIENT_SOURCE_OPTIONS.find(
              (o) => o.value === source
            );
            return (
              <Badge
                key={source}
                variant="secondary"
                className="text-xs"
                onClick={() => handleSourceChange(source, false)}
              >
                Source: {option?.label}
                <X className="ml-1 h-3 w-3 cursor-pointer" />
              </Badge>
            );
          })}
        </div>
      )}
    </div>
  );
}
