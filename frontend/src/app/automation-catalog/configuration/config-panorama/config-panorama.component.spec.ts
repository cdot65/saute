import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfigPanoramaComponent } from './config-panorama.component';

describe('ConfigPanoramaComponent', () => {
  let component: ConfigPanoramaComponent;
  let fixture: ComponentFixture<ConfigPanoramaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfigPanoramaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConfigPanoramaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
