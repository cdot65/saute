import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { FirewallCreateComponent } from "./firewall-create/firewall-create.component";

const routes: Routes = [
  {
    path: "create",
    component: FirewallCreateComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FirewallRoutingModule {}
