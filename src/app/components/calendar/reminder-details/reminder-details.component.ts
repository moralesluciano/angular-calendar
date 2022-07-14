import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { OpenWeatherForecast } from 'src/app/interfaces/open-weather.interface';
import { Reminder } from 'src/app/interfaces/reminder';
import { CalendarService } from 'src/app/services/calendar.service';
import { OpenWeatherService } from 'src/app/services/open-weather.service';
import { ReminderFormComponent } from '../../reminder-form/reminder-form.component';

@Component({
  selector: 'app-reminder-details',
  templateUrl: './reminder-details.component.html',
  styleUrls: ['./reminder-details.component.scss']
})
export class ReminderDetailsComponent implements OnInit {

  reminder: Reminder;
  weather: OpenWeatherForecast;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { reminder: Reminder },
    private openWeatherService: OpenWeatherService,
    private matDialog: MatDialog,
    private calendarService: CalendarService
  ) { }

  ngOnInit(): void {
    this.reminder = this.data.reminder;
    this.openWeatherService
      .getWeatherForecast(this.reminder.city)
      .subscribe( result => {
        this.weather = result
      });
  }

  onEditClick(reminder) {
    this.matDialog.closeAll();
    this.matDialog.open(ReminderFormComponent, {
      data: {
        reminder,
      },
    });
  }

  onDeleteClick(reminder) {
    this.matDialog.closeAll();
    if(confirm("Are you sure to delete this reminder?")) {
      this.calendarService.delete(reminder.id);
    }
  }

}
