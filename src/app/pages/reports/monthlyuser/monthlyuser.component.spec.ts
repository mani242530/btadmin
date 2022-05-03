import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MonthlyUserComponent } from './monthlyuser.component';

describe('MonthlyUserComponent', () => {
  let component: MonthlyUserComponent;
  let fixture: ComponentFixture<MonthlyUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MonthlyUserComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MonthlyUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
