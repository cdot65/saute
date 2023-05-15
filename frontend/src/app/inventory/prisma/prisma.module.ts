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

import { PrismaRoutingModule } from "./prisma-routing.module";
import { PrismaCreateComponent } from "./prisma-create/prisma-create.component";
import { PrismaListComponent } from "./prisma-list/prisma-list.component";
import { PrismaDetailsComponent } from "./prisma-details/prisma-details.component";

@NgModule({
  declarations: [
    PrismaCreateComponent,
    PrismaListComponent,
    PrismaDetailsComponent,
  ],
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
    PrismaRoutingModule,
  ],
})
export class PrismaModule {}
