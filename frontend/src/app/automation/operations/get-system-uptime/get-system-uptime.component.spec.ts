import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetSystemUptimeComponent } from './get-system-uptime.component';

describe('GetSystemUptimeComponent', () => {
  let component: GetSystemUptimeComponent;
  let fixture: ComponentFixture<GetSystemUptimeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GetSystemUptimeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GetSystemUptimeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
