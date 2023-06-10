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
import { CommonModule } from "@angular/common";
import { ConfigurationWidgetComponent } from "./widgets-configuration/widgets-configuration.component";
// local widgets
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
  ],
  exports: [
    DeployWidgetComponent,
    ConfigurationWidgetComponent,
    OperationsWidgetComponent,
    AssessmentWidgetComponent,
    PersonaWidgetComponent,
  ],
})
export class WidgetsModule {}
