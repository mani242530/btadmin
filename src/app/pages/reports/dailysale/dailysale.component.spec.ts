import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DailySaleComponent } from './dailysale.component';

describe('DailySaleComponent', () => {
  let component: DailySaleComponent;
  let fixture: ComponentFixture<DailySaleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DailySaleComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DailySaleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
