import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MonthlySaleComponent } from './monthlysale.component';

describe('MonthlySaleComponent', () => {
  let component: MonthlySaleComponent;
  let fixture: ComponentFixture<MonthlySaleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MonthlySaleComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MonthlySaleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
