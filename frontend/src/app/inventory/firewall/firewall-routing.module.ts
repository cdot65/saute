import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { FirewallCreateComponent } from "./firewall-create/firewall-create.component";
import { FirewallListComponent } from "./firewall-list/firewall-list.component";
import { FirewallDetailsComponent } from "./firewall-details/firewall-details.component";

const routes: Routes = [
  {
    path: "",
    component: FirewallListComponent,
  },
  {
    path: "create",
    component: FirewallCreateComponent,
  },
  {
    path: "details/:id",
    component: FirewallDetailsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FirewallRoutingModule {}
