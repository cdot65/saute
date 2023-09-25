import { RouterModule, Routes } from "@angular/router";

import { AdminReportComponent } from "./assessment/admin-report/admin-report.component";
import { AssuranceArpComponent } from "./operations/assurance-arp/assurance-arp.component";
import { AssuranceReadinessComponent } from "./operations/assurance-readiness/assurance-readiness.component";
import { AssuranceSnapshotComponent } from "./operations/assurance-snapshot/assurance-snapshot.component";
import { GetSoftwareInformationComponent } from "./operations/get-software-information/get-software-information.component";
import { NgModule } from "@angular/core";
import { SyncToPrismaComponent } from "./configuration/sync-to-prisma/sync-to-prisma.component";

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
    path: "operations/assurance-arp",
    component: AssuranceArpComponent,
  },
  {
    path: "operations/assurance-readiness",
    component: AssuranceReadinessComponent,
  },
  {
    path: "operations/assurance-snapshot",
    component: AssuranceSnapshotComponent,
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
