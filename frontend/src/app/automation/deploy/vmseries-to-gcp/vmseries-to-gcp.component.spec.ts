import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VmseriesToGcpComponent } from './vmseries-to-gcp.component';

describe('VmseriesToGcpComponent', () => {
  let component: VmseriesToGcpComponent;
  let fixture: ComponentFixture<VmseriesToGcpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VmseriesToGcpComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VmseriesToGcpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
