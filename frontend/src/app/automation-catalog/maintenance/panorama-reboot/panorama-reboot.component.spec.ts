import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PanoramaRebootComponent } from './panorama-reboot.component';

describe('PanoramaRebootComponent', () => {
  let component: PanoramaRebootComponent;
  let fixture: ComponentFixture<PanoramaRebootComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PanoramaRebootComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PanoramaRebootComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
