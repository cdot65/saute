import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SetHostnameComponent } from './configuration/set-hostname/set-hostname.component';
import { GetSoftwareInformationComponent } from './operations/get-software-information/get-software-information.component';
import { GetSystemUptimeComponent } from './operations/get-system-uptime/get-system-uptime.component';
import { CreateSecurityPolicyComponent } from './configuration/create-security-policy/create-security-policy.component';
import { AuditComponent } from './assessment/audit/audit.component';



@NgModule({
  declarations: [
    SetHostnameComponent,
    GetSoftwareInformationComponent,
    GetSystemUptimeComponent,
    CreateSecurityPolicyComponent,
    AuditComponent
  ],
  imports: [
    CommonModule
  ]
})
export class AutomationModule { }
