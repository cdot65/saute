import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { GetSoftwareInformationComponent } from "./operations/get-software-information/get-software-information.component";
import { SyncToPrismaComponent } from "./configuration/sync-to-prisma/sync-to-prisma.component";
import { AdminReportComponent } from "./assessment/admin-report/admin-report.component";
import { AssuranceArpEntryComponent } from "./operations/assurance-arp-entry/assurance-arp-entry.component";
import { AssuranceSnapshotsComponent } from "./operations/assurance-snapshots/assurance-snapshots.component";

const routes: Routes = [
  {
    path: "assessment/admin-report",
    component: AdminReportComponent,
  },
  {
    path: "configuration/sync-to-prisma",
    component: SyncToPrismaComponent,
  },
  {
    path: "operations/assurance-arp-entry",
    component: AssuranceArpEntryComponent,
  },
  {
    path: "operations/assurance-snapshots",
    component: AssuranceSnapshotsComponent,
  },
  {
    path: "operations/get-software-information",
    component: GetSoftwareInformationComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AutomationRoutingModule {}
