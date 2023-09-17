import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { PanoramaCreateComponent } from "./panorama-create/panorama-create.component";
import { PanoramaListComponent } from "./panorama-list/panorama-list.component";
import { PanoramaDetailsComponent } from "./panorama-details/panorama-details.component";

const routes: Routes = [
  {
    path: "",
    component: PanoramaListComponent,
  },
  {
    path: "create",
    component: PanoramaCreateComponent,
  },
  {
    path: "details/:id",
    component: PanoramaDetailsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PanoramaRoutingModule {}
