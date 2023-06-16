import {
  ButtonModule,
  CardModule,
  DropdownModule,
  GridModule,
  ProgressModule,
  SharedModule,
  WidgetModule,
} from "@coreui/angular";

import { AssessmentWidgetComponent } from "./widgets-assessment/widgets-assessment.component";
import { ChartjsModule } from "@coreui/angular-chartjs";
// local widgets
import { CodeEditorModule } from "@ngstack/code-editor";
import { CodeEditorWidgetComponent } from "./widgets-code-editor/widgets-code-editor.component";
import { CommonModule } from "@angular/common";
import { ConfigurationWidgetComponent } from "./widgets-configuration/widgets-configuration.component";
import { DeployWidgetComponent } from "./widgets-deploy/widgets-deploy.component";
import { IconModule } from "@coreui/icons-angular";
import { NgModule } from "@angular/core";
import { OperationsWidgetComponent } from "./widgets-operations/widgets-operations.component";
import { PersonaWidgetComponent } from "./widgets-persona/widgets-persona.component";
import { WidgetsRoutingModule } from "./widgets-routing.module";

@NgModule({
  declarations: [
    DeployWidgetComponent,
    ConfigurationWidgetComponent,
    OperationsWidgetComponent,
    AssessmentWidgetComponent,
    PersonaWidgetComponent,
    CodeEditorWidgetComponent,
  ],
  imports: [
    CommonModule,
    WidgetsRoutingModule,
    GridModule,
    WidgetModule,
    IconModule,
    DropdownModule,
    SharedModule,
    ButtonModule,
    CardModule,
    ProgressModule,
    ChartjsModule,
    CodeEditorModule.forRoot(),
  ],
  exports: [
    DeployWidgetComponent,
    ConfigurationWidgetComponent,
    OperationsWidgetComponent,
    AssessmentWidgetComponent,
    PersonaWidgetComponent,
    CodeEditorWidgetComponent,
  ],
})
export class WidgetsModule {}
