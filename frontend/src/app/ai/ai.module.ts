import {
  BadgeModule,
  ButtonGroupModule,
  ButtonModule,
  CardModule,
  DropdownModule,
  FormModule,
  GridModule,
  HeaderModule,
  SharedModule,
} from "@coreui/angular";

import { AiRoutingModule } from "./ai-routing.module";
import { CommonModule } from "@angular/common";
import { CreateScriptComponent } from "./create-script/create-script.component";
import { IconModule } from "@coreui/icons-angular";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { TroubleshootComponent } from "./troubleshoot/troubleshoot.component";

@NgModule({
  declarations: [TroubleshootComponent, CreateScriptComponent],
  imports: [
    CommonModule,
    AiRoutingModule,
    GridModule,
    CardModule,
    HeaderModule,
    IconModule,
    ButtonModule,
    ButtonGroupModule,
    DropdownModule,
    BadgeModule,
    FormModule,
    ReactiveFormsModule,
    SharedModule,
  ],
})
export class AiModule {}
