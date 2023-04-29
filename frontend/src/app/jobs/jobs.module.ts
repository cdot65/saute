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

import { JobsRoutingModule } from "./jobs-routing.module";
import { JobsListComponent } from "./jobs-list/jobs-list.component";
import { JobsDetailsComponent } from "./jobs-details/jobs-details.component";

@NgModule({
  declarations: [JobsListComponent, JobsDetailsComponent],
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
    JobsRoutingModule,
  ],
})
export class JobsModule {}
