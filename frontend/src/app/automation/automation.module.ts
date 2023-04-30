import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SetHostnameComponent } from './configuration/set-hostname/set-hostname.component';
import { GetSoftwareInformationComponent } from './operations/get-software-information/get-software-information.component';
import { GetSystemUptimeComponent } from './operations/get-system-uptime/get-system-uptime.component';
import { CreateSecurityPolicyComponent } from './configuration/create-security-policy/create-security-policy.component';
import { AuditComponent } from './assessment/audit/audit.component';
import { VmseriesToAzureComponent } from './deploy/vmseries-to-azure/vmseries-to-azure.component';
import { VmseriesToAwsComponent } from './deploy/vmseries-to-aws/vmseries-to-aws.component';
import { VmseriesToGcpComponent } from './deploy/vmseries-to-gcp/vmseries-to-gcp.component';
import { VmseriesToVcenterComponent } from './deploy/vmseries-to-vcenter/vmseries-to-vcenter.component';
import { VmseriesToProxmoxComponent } from './deploy/vmseries-to-proxmox/vmseries-to-proxmox.component';
import { VmseriesToOracleComponent } from './deploy/vmseries-to-oracle/vmseries-to-oracle.component';



@NgModule({
  declarations: [
    SetHostnameComponent,
    GetSoftwareInformationComponent,
    GetSystemUptimeComponent,
    CreateSecurityPolicyComponent,
    AuditComponent,
    VmseriesToAzureComponent,
    VmseriesToAwsComponent,
    VmseriesToGcpComponent,
    VmseriesToVcenterComponent,
    VmseriesToProxmoxComponent,
    VmseriesToOracleComponent
  ],
  imports: [
    CommonModule
  ]
})
export class AutomationModule { }
