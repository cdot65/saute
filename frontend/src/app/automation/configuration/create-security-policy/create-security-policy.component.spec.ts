import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateSecurityPolicyComponent } from './create-security-policy.component';

describe('CreateSecurityPolicyComponent', () => {
  let component: CreateSecurityPolicyComponent;
  let fixture: ComponentFixture<CreateSecurityPolicyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateSecurityPolicyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateSecurityPolicyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
