import { Time } from '@angular/common';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Capability } from 'protractor';
import { Subject } from 'rxjs';
import { Reminder, reminderDto } from 'src/app/interfaces/reminder';
import { CalendarService } from 'src/app/services/calendar.service';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-reminder-form',
  templateUrl: './reminder-form.component.html',
  styleUrls: ['./reminder-form.component.scss']
})
export class ReminderFormComponent implements OnInit {

  form: FormGroup;
  isUpdatingReminder = false;
  onDestroy$ = new Subject<boolean>();

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: {reminder: Reminder},
    public dialogRef: MatDialogRef<ReminderFormComponent>,
    private fb: FormBuilder,
    private calendarService: CalendarService
  ) {
    this.buildForm();
  }

  ngOnInit(): void {
    this.isUpdatingReminder = !!this.data.reminder;
    
    if (this.isUpdatingReminder) {
       this.setValuesForm(this.data.reminder);
    }
  }

  save() {
    if (this.form.valid) {

      if (this.isUpdatingReminder) {
        this.updateReminder(this.data.reminder);
      } else {
        this.createReminder();
      }

    }
  }

  private createReminder() {
    let { text, date, city, time } = this.form.value;

    const reminder: reminderDto = {
      text,
      date,
      city
    }

    if (time) {
      reminder.time = this.adapterReminderTime(time);
    }
    
    this.calendarService
      .create(reminder)
      .pipe(takeUntil(this.onDestroy$))
      .subscribe( rDto => {
        this.dialogRef.close();
      });

  }

  private updateReminder(reminder: Reminder) {
    let { text, date, city, time } = this.form.value;

    reminder.text = text;
    reminder.city = city;
    reminder.date = date;

    if (time) {
      reminder.time = this.adapterReminderTime(time);
    }

    this.calendarService
      .update(reminder)
      .pipe(takeUntil(this.onDestroy$))
      .subscribe(r => {
        this.dialogRef.close();
      })

  }

  private buildForm() {
    this.form = this.fb.group({
      text: ['', [Validators.required, Validators.maxLength(30)]],
      city: ['', [Validators.required]],
      date: ['', [Validators.required]],
      time: ['']
    });
  }

  private setValuesForm(reminder: Reminder) {
    // we should use a datetime picker instead of doing this
    this.textField.setValue(reminder.text);
    this.cityField.setValue(reminder.city);
    this.dateField.setValue(reminder.date);

    if (reminder.time) {
      const time = reminder.time.hours + ':' + reminder.time.minutes;
      this.timeField.setValue(time);
    }
  }

  private adapterReminderTime(timeStr): Time {
    const timeArr = timeStr.split(":");
    return {
      hours: timeArr[0],
      minutes: timeArr[1]
    }
  }

  get textField() {
    return this.form.get('text');
  }
  get cityField() {
    return this.form.get('city');
  }
  get dateField() {
    return this.form.get('date');
  }
  get timeField() {
    return this.form.get('time');
  }

}
