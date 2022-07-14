import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Reminder } from 'src/app/interfaces/reminder';

@Component({
  selector: 'app-reminder-all-list',
  templateUrl: './reminder-all-list.component.html',
  styleUrls: ['./reminder-all-list.component.scss']
})
export class ReminderAllListComponent implements OnInit {

  reminders: Reminder[];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: {reminders: Reminder[]},
    public dialogRef: MatDialogRef<ReminderAllListComponent>,
  ) { }

  ngOnInit(): void {
    this.reminders = this.data.reminders;
  }

  onReminderClick(reminder: Reminder) {
    this.dialogRef.close(reminder);
  }

}
