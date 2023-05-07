import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { JobsListComponent } from "./jobs-list/jobs-list.component";
import { JobsDetailsComponent } from "./jobs-details/jobs-details.component"; // Import the new component

const routes: Routes = [
  {
    path: "",
    component: JobsListComponent,
  },
  {
    path: "details/:id",
    component: JobsDetailsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class JobsRoutingModule {}
