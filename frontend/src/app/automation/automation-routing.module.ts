import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { GetSoftwareInformationComponent } from "./operations/get-software-information/get-software-information.component";
import { SyncToPrismaComponent } from "./configuration/sync-to-prisma/sync-to-prisma.component";
import { AdminReportComponent } from "./assessment/admin-report/admin-report.component";

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
    path: "operations/get-software-information",
    component: GetSoftwareInformationComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AutomationRoutingModule {}
