import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfigPanosComponent } from './config-panos.component';

describe('ConfigPanosComponent', () => {
  let component: ConfigPanosComponent;
  let fixture: ComponentFixture<ConfigPanosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfigPanosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConfigPanosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
