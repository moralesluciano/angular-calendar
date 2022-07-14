import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReminderAllListComponent } from './reminder-all-list.component';

describe('ReminderAllListComponent', () => {
  let component: ReminderAllListComponent;
  let fixture: ComponentFixture<ReminderAllListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReminderAllListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReminderAllListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
