import { Injectable } from '@angular/core';
import { RealtimeDatabaseService } from '../../shared/services/realtime-database.service';
import { LogEntry } from '../../shared/models/log-entry.model';
import { map } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class LoggerService {
  private readonly collectionName = 'logs';

  constructor(private db: RealtimeDatabaseService<LogEntry>) {}

  async log(
    userId: string,
    actionType: string,
    details: string
  ): Promise<void> {
    const logEntry: LogEntry = {
      userId,
      actionType,
      details,
      timestamp: new Date().toISOString(),
    };

    await this.db.add(this.collectionName, logEntry);
  }

  getAllLogs() {
    return this.db.getAll(this.collectionName);
  }

  getLogsByUser(userId: string) {
    return this.db
      .getAll(this.collectionName)
      .pipe(map((logs) => logs.filter((log) => log.userId === userId)));
  }
}
