import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { switchMap, takeUntil } from 'rxjs/operators';
import { Reminder, reminderDto,  } from 'src/app/interfaces/reminder';
import { CalendarService } from 'src/app/services/calendar.service';
import { WeatherService } from 'src/app/services/weather.service';
import { MatDialog } from '@angular/material/dialog';
import { ReminderFormComponent } from '../reminder-form/reminder-form.component';
import { ReminderService } from 'src/app/services/reminder.service';


@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit, OnDestroy {

  onDestroy$ = new Subject<boolean>();

  dates: Date[];
  days: String[];
  date = new Date();
  calendarData = [];
  remindersByDay: { [key: number]: Reminder[] } = {};
  loading = false;
  readonly DAY_MS = 60 * 60 * 24 * 1000;
  reminders: Reminder[];

  constructor(
    private calendarService: CalendarService,
    private matDialog: MatDialog,
    private reminderService: ReminderService
  ) { }

  ngOnInit(): void {
    this.days = this.getDaysOfWeek();

    this.calendarService.listAllReminders()
      .pipe(takeUntil(this.onDestroy$))
      .subscribe((reminders: Reminder[]) => {
        this.reminders = reminders;
        this.createCalendar(this.date, this.reminders);
      });

    this.getRemindersChanged();
  }

  ngOnDestroy() {
    this.onDestroy$.next(true);
    this.onDestroy$.complete();
  }

  openReminderForm(reminder?: Reminder) {
    this.matDialog.open(ReminderFormComponent, {
      data: {
        reminder,
      },
    });
  }

  setMonth(value: number) {
    const [year, month] = [this.date.getFullYear(), this.date.getMonth()];
    this.date = new Date(year, month + value, 1);
    this.createCalendar(this.date, this.reminders);
  }

  isCurrentMonth(date: Date) {
    return date.getMonth() === this.date.getMonth();
  }

  isWeekendDay(date: Date) {
    return date.getDay() === 6 || date.getDay() === 0;
  }

  private getDaysOfWeek() {
    return [
      'Sunday',
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday'
    ];
  }

  private getDays(date: Date) {
    const startTime: number =  this.getStartDay(date).getTime();

    return this.range(0, 41)
      .map(num => new Date(startTime + this.DAY_MS * num));
  }

  private getStartDay(date: Date) {
    const [year, month] = [date.getFullYear(), date.getMonth()];
    const firstDayOfMonth = new Date(year, month, 1).getTime();

    return this.range(1,7)
      .map(num => new Date(firstDayOfMonth - this.DAY_MS * num))
      .find(dt => dt.getDay() === 0)
  }

  private range(start: number, end: number) {
    const length = end - start + 1;

    return Array.from({ length }, (v, i) => start + i)
  }

  private createCalendar(date: Date, reminders: Reminder[]) {
    this.calendarData = [];
    this.dates = this.getDays(date);
    this.dates.forEach((date: Date) => {
      this.calendarData.push({
        date,
        reminders: this.calendarService.genRemindersByDate(date, reminders)
      })
    });

  }

  private getRemindersChanged(): void {
    this.reminderService.getRemindersChanged()
      .pipe(
        takeUntil(this.onDestroy$),
        switchMap(() => this.calendarService.listAllReminders())
      ).subscribe(reminders => {
        this.reminders = reminders;
        this.loading = true;

        // simulate a server time response
        setTimeout(() => {
          this.createCalendar(this.date, this.reminders)
          this.loading = false;
        }, 500)
      });
  }

}
