import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PanosReportsComponent } from './panos-reports.component';

describe('PanosReportsComponent', () => {
  let component: PanosReportsComponent;
  let fixture: ComponentFixture<PanosReportsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PanosReportsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PanosReportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
