import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VmseriesToProxmoxComponent } from './vmseries-to-proxmox.component';

describe('VmseriesToProxmoxComponent', () => {
  let component: VmseriesToProxmoxComponent;
  let fixture: ComponentFixture<VmseriesToProxmoxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VmseriesToProxmoxComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VmseriesToProxmoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
