import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VmseriesToOracleComponent } from './vmseries-to-oracle.component';

describe('VmseriesToOracleComponent', () => {
  let component: VmseriesToOracleComponent;
  let fixture: ComponentFixture<VmseriesToOracleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VmseriesToOracleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VmseriesToOracleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
