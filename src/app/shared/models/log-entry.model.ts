export interface LogEntry {
  id?: string;
  userId: string;
  actionType: string;
  details: string;
  timestamp: string;
}
