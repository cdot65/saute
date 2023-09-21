import {
  ButtonModule,
  CardModule,
  DropdownModule,
  GridModule,
  ProgressModule,
  SharedModule,
  WidgetModule,
} from "@coreui/angular";

import { AutomationAssessmentComponent } from "./widgets-assessment/widgets-assessment.component";
import { AutomationConfigurationComponent } from "./widgets-configuration/widgets-configuration.component";
import { AutomationDeployComponent } from "./widgets-deploy/widgets-deploy.component";
import { AutomationOperationsComponent } from "./widgets-operations/widgets-operations.component";
import { ChartjsModule } from "@coreui/angular-chartjs";
import { CodeEditorModule } from "@ngstack/code-editor";
import { CodeEditorWidgetComponent } from "./widgets-code-editor/widgets-code-editor.component";
import { CommonModule } from "@angular/common";
import { IconModule } from "@coreui/icons-angular";
import { NgModule } from "@angular/core";
import { PersonaWidgetComponent } from "./widgets-persona/widgets-persona.component";
import { WidgetsRoutingModule } from "./widgets-routing.module";

@NgModule({
  declarations: [
    AutomationDeployComponent,
    AutomationConfigurationComponent,
    AutomationOperationsComponent,
    AutomationAssessmentComponent,
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
    AutomationDeployComponent,
    AutomationConfigurationComponent,
    AutomationOperationsComponent,
    AutomationAssessmentComponent,
    PersonaWidgetComponent,
    CodeEditorWidgetComponent,
  ],
})
export class WidgetsModule {}
