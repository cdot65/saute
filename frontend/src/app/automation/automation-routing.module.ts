import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { GetSoftwareInformationComponent } from "./operations/get-software-information/get-software-information.component";

const routes: Routes = [
  {
    path: "operations/get-software-information",
    component: GetSoftwareInformationComponent,
  },
  // Add any additional routes here as needed
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AutomationRoutingModule {}
