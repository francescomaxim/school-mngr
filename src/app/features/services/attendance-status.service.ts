import { Injectable, inject } from '@angular/core';
import { RealtimeDatabaseService } from '../../shared/services/realtime-database.service';
import { Observable } from 'rxjs';

export interface AttendanceStatus {
  fullName: string;
  present: boolean;
}

@Injectable({ providedIn: 'root' })
export class AttendanceService {
  constructor(private db: RealtimeDatabaseService<any>) {}

  getAttendance(
    courseId: string,
    date: string
  ): Observable<Record<string, string>> {
    return this.db.getById(`attendance/${courseId}`, date) as Observable<
      Record<string, string>
    >;
  }

  saveAttendance(courseId: string, date: string, data: Record<string, string>) {
    return this.db.update(`attendance/${courseId}`, date, data);
  }

  async getAttendanceForStudent(
    courseId: string,
    studentId: string
  ): Promise<Record<string, string>> {
    const allDates = await this.db.getAll(`attendance/${courseId}`).toPromise();

    const result: Record<string, string> = {};
    for (const entry of allDates!) {
      const date = entry.id;
      const studentStatus = entry[studentId];
      if (studentStatus) {
        result[date] = studentStatus;
      }
    }

    return result;
  }
}
