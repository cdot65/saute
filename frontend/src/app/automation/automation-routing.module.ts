import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { GetSoftwareInformationComponent } from "./operations/get-software-information/get-software-information.component";
import { SyncToPrismaComponent } from "./configuration/sync-to-prisma/sync-to-prisma.component";

const routes: Routes = [
  {
    path: "operations/get-software-information",
    component: GetSoftwareInformationComponent,
  },
  {
    path: "configuration/sync-to-prisma",
    component: SyncToPrismaComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AutomationRoutingModule {}
