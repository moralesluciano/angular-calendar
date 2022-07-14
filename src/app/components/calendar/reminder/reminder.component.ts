import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Reminder } from 'src/app/interfaces/reminder';
import { ReminderAllListComponent } from '../reminder-all-list/reminder-all-list.component';
import { ReminderDetailsComponent } from '../reminder-details/reminder-details.component';

@Component({
  selector: 'app-reminder',
  templateUrl: './reminder.component.html',
  styleUrls: ['./reminder.component.scss']
})
export class ReminderComponent implements OnInit {
  @Input() reminders: Reminder[];

  items: Reminder[];

  constructor(
    private matDialog: MatDialog
  ) { }

  ngOnInit(): void {
    if (this.reminders.length > 2) {
      this.items = this.reminders.slice(0,1);
    } else {
      this.items = [...this.reminders];
    }
  }

  openRemainderDetails(reminder: Reminder) {
    const dialogRef = this.matDialog.open(ReminderDetailsComponent, {
      width: '250px',
      height: '280px',
      data: {
        reminder,
      },
    });
  }

  seeAllReminders() {
    const dialogRef = this.matDialog.open(ReminderAllListComponent, {
      width: '200px',
      height: '200px',
      data: {
        reminders: this.reminders,
      },
    });

    dialogRef.afterClosed().subscribe( reminder => {
      this.openRemainderDetails(reminder);
    })
  }

}
