import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SyncToPrismaComponent } from './sync-to-prisma.component';

describe('SyncToPrismaComponent', () => {
  let component: SyncToPrismaComponent;
  let fixture: ComponentFixture<SyncToPrismaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SyncToPrismaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SyncToPrismaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
