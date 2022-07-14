import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalendarRoutingModule } from './calendar-routing.module';
import { CalendarComponent } from './calendar.component';
import { SharedModule } from 'src/app/modules/shared/shared.module';
import { ReminderFormComponent } from '../reminder-form/reminder-form.component';
import { ReminderFormModule } from '../reminder-form/reminder-form.module';
import { ReminderComponent } from './reminder/reminder.component';
import { ReminderDetailsComponent } from './reminder-details/reminder-details.component';
import { ReminderAllListComponent } from './reminder-all-list/reminder-all-list.component';

@NgModule({
  declarations: [CalendarComponent, ReminderComponent, ReminderDetailsComponent, ReminderAllListComponent],
  exports: [CalendarComponent],
  imports: [
    CommonModule,
    CalendarRoutingModule,
    SharedModule,
    ReminderFormModule,
  ],
  entryComponents: [ReminderFormComponent, ReminderDetailsComponent, ReminderAllListComponent],
})
export class CalendarModule { }
