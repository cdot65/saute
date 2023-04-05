import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrismaCreateComponent } from './prisma-create.component';

describe('PrismaCreateComponent', () => {
  let component: PrismaCreateComponent;
  let fixture: ComponentFixture<PrismaCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrismaCreateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PrismaCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
