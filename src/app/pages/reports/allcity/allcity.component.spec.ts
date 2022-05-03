import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllCityComponent } from './allcity.component';

describe('AllCityComponent', () => {
  let component: AllCityComponent;
  let fixture: ComponentFixture<AllCityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AllCityComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AllCityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
