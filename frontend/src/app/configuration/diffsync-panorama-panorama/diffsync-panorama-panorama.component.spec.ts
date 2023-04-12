import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiffsyncPanoramaPanoramaComponent } from './diffsync-panorama-panorama.component';

describe('DiffsyncPanoramaPanoramaComponent', () => {
  let component: DiffsyncPanoramaPanoramaComponent;
  let fixture: ComponentFixture<DiffsyncPanoramaPanoramaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DiffsyncPanoramaPanoramaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DiffsyncPanoramaPanoramaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
