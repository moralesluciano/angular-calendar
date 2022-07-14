import { Time } from "@angular/common";

export interface Reminder {
  id: number;
  text: string;
  date: Date;
  time?: Time
  city: string;
}

export type reminderDto = Omit<Reminder, 'id'>;