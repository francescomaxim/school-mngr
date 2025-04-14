import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoggerService } from '../../../core/services/logger.service';
import { LogEntry } from '../../../shared/models/log-entry.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-admin-logs',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './admin-logs.component.html',
})
export class AdminLogsComponent implements OnInit {
  private loggerService = inject(LoggerService);
  logs$: Observable<LogEntry[]> = this.loggerService.getAllLogs();

  ngOnInit(): void {}
}
