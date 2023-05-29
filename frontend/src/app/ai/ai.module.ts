import {
  AccordionModule,
  BadgeModule,
  ButtonGroupModule,
  ButtonModule,
  CardModule,
  DropdownModule,
  FormModule,
  GridModule,
  HeaderModule,
  ModalModule,
  SharedModule,
  SpinnerModule,
} from "@coreui/angular";

import { AiRoutingModule } from "./ai-routing.module";
import { AutomationDocsModule } from "../shared/modules/automation-docs/automation-docs.module";
import { CommonModule } from "@angular/common";
import { CreateScriptComponent } from "./create-script/create-script.component";
import { IconModule } from "@coreui/icons-angular";
import { NgModule } from "@angular/core";
import { ProgressModule } from "@coreui/angular";
import { ReactiveFormsModule } from "@angular/forms";
import { TroubleshootComponent } from "./troubleshoot/troubleshoot.component";

@NgModule({
  declarations: [TroubleshootComponent, CreateScriptComponent],
  imports: [
    CommonModule,
    AiRoutingModule,
    AutomationDocsModule,
    GridModule,
    CardModule,
    HeaderModule,
    IconModule,
    ButtonModule,
    ButtonGroupModule,
    DropdownModule,
    BadgeModule,
    FormModule,
    ProgressModule,
    ReactiveFormsModule,
    SharedModule,
    AccordionModule,
    SpinnerModule,
    ModalModule,
  ],
})
export class AiModule {}
