import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import {
  ButtonGroupModule,
  ButtonModule,
  CardModule,
  DropdownModule,
  FormModule,
  GridModule,
  ListGroupModule,
  SharedModule,
} from "@coreui/angular";

import { AutomationDocsModule } from "../shared/modules/automation-docs/automation-docs.module";
import { NotificationsModule } from "../views/notifications/notifications.module";

// routing
import { AutomationRoutingModule } from "./automation-routing.module";

// local components
import { SetHostnameComponent } from "./configuration/set-hostname/set-hostname.component";
import { GetSoftwareInformationComponent } from "./operations/get-software-information/get-software-information.component";
import { GetSystemUptimeComponent } from "./operations/get-system-uptime/get-system-uptime.component";
import { CreateSecurityPolicyComponent } from "./configuration/create-security-policy/create-security-policy.component";
import { AuditComponent } from "./assessment/audit/audit.component";
import { VmseriesToAzureComponent } from "./deploy/vmseries-to-azure/vmseries-to-azure.component";
import { VmseriesToAwsComponent } from "./deploy/vmseries-to-aws/vmseries-to-aws.component";
import { VmseriesToGcpComponent } from "./deploy/vmseries-to-gcp/vmseries-to-gcp.component";
import { VmseriesToVcenterComponent } from "./deploy/vmseries-to-vcenter/vmseries-to-vcenter.component";
import { VmseriesToProxmoxComponent } from "./deploy/vmseries-to-proxmox/vmseries-to-proxmox.component";
import { VmseriesToOracleComponent } from "./deploy/vmseries-to-oracle/vmseries-to-oracle.component";
import { SyncToPrismaComponent } from './configuration/sync-to-prisma/sync-to-prisma.component';

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
    VmseriesToOracleComponent,
    SyncToPrismaComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
    GridModule,
    ButtonGroupModule,
    ButtonModule,
    CardModule,
    DropdownModule,
    ListGroupModule,
    SharedModule,
    FormModule,
    AutomationRoutingModule,
    AutomationDocsModule,
    NotificationsModule,
  ],
})
export class AutomationModule {}
