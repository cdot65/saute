import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetCertificateChainComponent } from './get-certificate-chain.component';

describe('GetCertificateChainComponent', () => {
  let component: GetCertificateChainComponent;
  let fixture: ComponentFixture<GetCertificateChainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GetCertificateChainComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GetCertificateChainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
