import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import {
  ButtonGroupModule,
  ButtonModule,
  CardModule,
  DropdownModule,
  FormModule,
  GridModule,
  ListGroupModule,
  SharedModule,
} from "@coreui/angular";

import { FirewallRoutingModule } from "./firewall-routing.module";
import { FirewallCreateComponent } from "./firewall-create/firewall-create.component";
import { FirewallListComponent } from "./firewall-list/firewall-list.component"; // Import the new component

@NgModule({
  declarations: [FirewallCreateComponent, FirewallListComponent], // Include the new component
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    GridModule,
    ButtonGroupModule,
    ButtonModule,
    CardModule,
    DropdownModule,
    ListGroupModule,
    SharedModule,
    FormModule,
    FirewallRoutingModule,
  ],
})
export class FirewallModule {}
