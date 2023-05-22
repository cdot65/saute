import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import {
  ButtonModule,
  CardModule,
  DropdownModule,
  GridModule,
  ProgressModule,
  SharedModule,
  WidgetModule,
} from "@coreui/angular";
import { IconModule } from "@coreui/icons-angular";
import { ChartjsModule } from "@coreui/angular-chartjs";

import { WidgetsRoutingModule } from "./widgets-routing.module";

// local widgets
import { DeployWidgetComponent } from "./widgets-deploy/widgets-deploy.component";
import { ConfigurationWidgetComponent } from "./widgets-configuration/widgets-configuration.component";
import { OperationsWidgetComponent } from "./widgets-operations/widgets-operations.component";
import { AssessmentWidgetComponent } from "./widgets-assessment/widgets-assessment.component";

@NgModule({
  declarations: [
    DeployWidgetComponent,
    ConfigurationWidgetComponent,
    OperationsWidgetComponent,
    AssessmentWidgetComponent,
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
  ],
})
export class WidgetsModule {}
