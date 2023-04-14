import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PanosCommandsComponent } from './panos-commands.component';

describe('PanosCommandsComponent', () => {
  let component: PanosCommandsComponent;
  let fixture: ComponentFixture<PanosCommandsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PanosCommandsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PanosCommandsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
