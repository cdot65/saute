import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PanosRebootComponent } from './panos-reboot.component';

describe('PanosRebootComponent', () => {
  let component: PanosRebootComponent;
  let fixture: ComponentFixture<PanosRebootComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PanosRebootComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PanosRebootComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
