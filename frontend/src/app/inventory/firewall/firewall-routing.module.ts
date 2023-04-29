import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { FirewallCreateComponent } from "./firewall-create/firewall-create.component";
import { FirewallListComponent } from "./firewall-list/firewall-list.component"; // Import the new component

const routes: Routes = [
  {
    path: "create",
    component: FirewallCreateComponent,
  },
  {
    path: "", // Add a new route for the firewall list component
    component: FirewallListComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FirewallRoutingModule {}
