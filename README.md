## A simple demo calendar application using Angular

## Description

<div align="center">
    <img src="https://raw.githubusercontent.com/Jobsity/ReactChallenge/main/src/assets/CalendarSample.png"/>
</div>

## Mandatory features
 - Ability to add "*reminders*" (max. 30 characters) for a day and time specified by the user. Also, include a city.
 - Ability to edit reminders - including changing text, city, day and time.
 - Add a weather service call from [OpenWeather](https://openweathermap.org/forecast16) and get the weather forecast (e.g. Rain) for the date of the calendar reminder based on the city.
 - Expand the calendar to support more than the current month or year.
 - Properly handle overflow when multiple reminders appear on the same date.

## Considerations

 - The project is completely focused on Front-end
 - The calendar uses the route `/calendar`
 - The calendar uses small helper libraries for:
 -- UI Elements.
 -- Date/Time handling.
 -  The calendar do not use calendar libraries like FullCalendar or Bootstrap Calendar.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
