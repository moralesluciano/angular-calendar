import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { reminderDto, Reminder } from '../interfaces/reminder';
import { ReminderService } from './reminder.service';


@Injectable({
  providedIn: 'root'
})
export class CalendarService {

  constructor(
    private reminderService: ReminderService
  ) { }

  create(reminderDto: reminderDto): Observable<reminderDto> {
    return of(this.reminderService.add(reminderDto));
  }

  update(reminder: Reminder): Observable<Reminder> {
    return of(this.reminderService.update(reminder))
  }

  listAllReminders(): Observable<Reminder[]> {
    return this.reminderService.getAllReminders();
  }

  delete(id: number): boolean {
    return this.reminderService.delete(id);
  }

  genRemindersByDate(date: Date, reminders: Reminder[]) {
    return reminders.filter(r => {
      return date.getTime() === new Date(r.date).getTime();
    })
  }
}
