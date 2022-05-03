import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DailyUserComponent } from './dailyuser.component';

describe('DailyUserComponent', () => {
  let component: DailyUserComponent;
  let fixture: ComponentFixture<DailyUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DailyUserComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DailyUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
