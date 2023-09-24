import {
  AccordionModule,
  ButtonGroupModule,
  ButtonModule,
  CardModule,
  DropdownModule,
  FormModule,
  GridModule,
  ListGroupModule,
  ModalModule,
  ProgressModule,
  SharedModule,
  SpinnerModule,
} from "@coreui/angular";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

// local components
import { AdminReportComponent } from "./assessment/admin-report/admin-report.component";
import { AssuranceArpComponent } from "./operations/assurance-arp/assurance-arp.component";
import { AssuranceSnapshotComponent } from "./operations/assurance-snapshot/assurance-snapshot.component";
import { AutomationInterfaceModule } from "../../shared/modules/automation-interface/automation-interface.module";
// routing
import { AutomationRoutingModule } from "./automation-routing.module";
import { CommonModule } from "@angular/common";
import { GetSoftwareInformationComponent } from "./operations/get-software-information/get-software-information.component";
import { NgModule } from "@angular/core";
import { NotificationsModule } from "../../views/notifications/notifications.module";
import { SyncToPrismaComponent } from "./configuration/sync-to-prisma/sync-to-prisma.component";
import { VmseriesToAwsComponent } from "./deploy/vmseries-to-aws/vmseries-to-aws.component";
import { VmseriesToAzureComponent } from "./deploy/vmseries-to-azure/vmseries-to-azure.component";
import { VmseriesToVcenterComponent } from "./deploy/vmseries-to-vcenter/vmseries-to-vcenter.component";
import { WidgetsModule } from "../../shared/modules/widgets/widgets.module";

@NgModule({
  declarations: [
    GetSoftwareInformationComponent,
    VmseriesToAzureComponent,
    VmseriesToAwsComponent,
    VmseriesToVcenterComponent,
    SyncToPrismaComponent,
    AdminReportComponent,
    AssuranceArpComponent,
    AssuranceSnapshotComponent,
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
    AutomationInterfaceModule,
    NotificationsModule,
    WidgetsModule,
    AccordionModule,
    ModalModule,
    SpinnerModule,
    ProgressModule,
  ],
})
export class AutomationModule {}
