import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PanoramaCreateComponent } from './panorama-create.component';

describe('PanoramaCreateComponent', () => {
  let component: PanoramaCreateComponent;
  let fixture: ComponentFixture<PanoramaCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PanoramaCreateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PanoramaCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
