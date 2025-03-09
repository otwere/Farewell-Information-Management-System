export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  avatar?: string;
}
export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  timestamp: Date;
  read: boolean;
}
export interface ActivityLog {
  id: string;
  user: string;
  action: string;
  details: string;
  timestamp: Date;
  module: string;
}
export type SortDirection = 'asc' | 'desc';
export type ViewMode = 'grid' | 'list';
export interface FilterOption {
  id: string;
  label: string;
  value: string;
}
export interface TableColumn {
  id: string;
  label: string;
  sortable?: boolean;
  filterable?: boolean;
  searchable?: boolean;
}