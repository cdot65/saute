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

import { PanoramaRoutingModule } from "./panorama-routing.module";
import { PanoramaCreateComponent } from "./panorama-create/panorama-create.component";

@NgModule({
  declarations: [PanoramaCreateComponent],
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
    PanoramaRoutingModule,
  ],
})
export class PanoramaModule {}
