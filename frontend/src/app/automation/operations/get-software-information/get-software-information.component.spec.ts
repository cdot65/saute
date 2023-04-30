import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetSoftwareInformationComponent } from './get-software-information.component';

describe('GetSoftwareInformationComponent', () => {
  let component: GetSoftwareInformationComponent;
  let fixture: ComponentFixture<GetSoftwareInformationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GetSoftwareInformationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GetSoftwareInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
