import { Injectable } from '@angular/core';
import { BehaviorSubject, of } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';
import { reminderDto, Reminder } from '../interfaces/reminder';

@Injectable({
  providedIn: 'root'
})
export class ReminderService {

  reminders: Reminder[] = [ ];

  private remindersChanged$ = new BehaviorSubject<boolean>(false);

  constructor() { }

  add(reminderDto: reminderDto) {
    const newReminder: Reminder = {
      id: Math.random(),
      ...reminderDto
    }
    this.reminders.push(newReminder);
    this.setRemindersChanged(true);
    return reminderDto;
  }

  update(reminder: Reminder) {
    let index = this.reminders.findIndex(item => item.id === reminder.id);
    this.reminders[index] = {
      ...reminder
    }
    this.setRemindersChanged(true);
    return this.reminders[index]; 
  }

  delete(id: number) {
    let index = this.reminders.findIndex(item => item.id === id);

    if (index > -1) {
      this.reminders.splice(index, 1)
    }
    this.setRemindersChanged(true);
    return true;
  }

  getAllReminders(): Observable<Reminder[]> {
    return of(this.reminders);
  }

  setRemindersChanged(action: boolean): void {
     this.remindersChanged$.next(action);
  }

  getRemindersChanged(): Observable<boolean> {
    return this.remindersChanged$.asObservable();
  }

}