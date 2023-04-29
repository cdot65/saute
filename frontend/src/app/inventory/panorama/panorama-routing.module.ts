import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { PanoramaCreateComponent } from "./panorama-create/panorama-create.component";

const routes: Routes = [
  {
    path: "create",
    component: PanoramaCreateComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PanoramaRoutingModule {}
