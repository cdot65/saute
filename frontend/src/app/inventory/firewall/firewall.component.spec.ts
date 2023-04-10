import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FirewallComponent } from './firewall.component';

describe('FirewallComponent', () => {
  let component: FirewallComponent;
  let fixture: ComponentFixture<FirewallComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FirewallComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FirewallComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
