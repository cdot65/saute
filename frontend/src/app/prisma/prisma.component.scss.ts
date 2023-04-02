import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrismaComponent } from './prisma.component';

describe('PrismaComponent', () => {
  let component: PrismaComponent;
  let fixture: ComponentFixture<PrismaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrismaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PrismaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
