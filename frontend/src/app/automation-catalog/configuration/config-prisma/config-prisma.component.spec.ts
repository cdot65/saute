import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfigPrismaComponent } from './config-prisma.component';

describe('ConfigPrismaComponent', () => {
  let component: ConfigPrismaComponent;
  let fixture: ComponentFixture<ConfigPrismaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfigPrismaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConfigPrismaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
