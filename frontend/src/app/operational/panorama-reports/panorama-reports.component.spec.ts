import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PanoramaReportsComponent } from './panorama-reports.component';

describe('PanoramaReportsComponent', () => {
  let component: PanoramaReportsComponent;
  let fixture: ComponentFixture<PanoramaReportsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PanoramaReportsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PanoramaReportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
