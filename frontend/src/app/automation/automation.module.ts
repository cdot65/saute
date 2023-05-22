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
import { AdminReportComponent } from "./assessment/admin-report/admin-report.component";
import { AssuranceArpEntryComponent } from "./operations/assurance-arp-entry/assurance-arp-entry.component";
import { GetSoftwareInformationComponent } from "./operations/get-software-information/get-software-information.component";
import { SyncToPrismaComponent } from "./configuration/sync-to-prisma/sync-to-prisma.component";
import { VmseriesToAzureComponent } from "./deploy/vmseries-to-azure/vmseries-to-azure.component";
import { VmseriesToAwsComponent } from "./deploy/vmseries-to-aws/vmseries-to-aws.component";
import { VmseriesToVcenterComponent } from "./deploy/vmseries-to-vcenter/vmseries-to-vcenter.component";

@NgModule({
  declarations: [
    GetSoftwareInformationComponent,
    VmseriesToAzureComponent,
    VmseriesToAwsComponent,
    VmseriesToVcenterComponent,
    SyncToPrismaComponent,
    AdminReportComponent,
    AssuranceArpEntryComponent,
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
