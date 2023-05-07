import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SetHostnameComponent } from './set-hostname.component';

describe('SetHostnameComponent', () => {
  let component: SetHostnameComponent;
  let fixture: ComponentFixture<SetHostnameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SetHostnameComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SetHostnameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
