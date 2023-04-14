import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiffsyncPanoramaPrismaComponent } from './diffsync-panorama-prisma.component';

describe('DiffsyncPanoramaPrismaComponent', () => {
  let component: DiffsyncPanoramaPrismaComponent;
  let fixture: ComponentFixture<DiffsyncPanoramaPrismaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DiffsyncPanoramaPrismaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DiffsyncPanoramaPrismaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
