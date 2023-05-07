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

import { DocsComponentsModule } from "@docs-components/docs-components.module";

import { WidgetsRoutingModule } from "./widgets-routing.module";
import { WidgetsComponent } from "./widgets/widgets.component";
import { WidgetsBrandComponent } from "./widgets-brand/widgets-brand.component";
import {
  ChartSample,
  WidgetsDropdownComponent,
} from "./widgets-dropdown/widgets-dropdown.component";
import { WidgetsEComponent } from "./widgets-e/widgets-e.component";

// local widgets
import { DeployWidgetComponent } from "./widgets-deploy/widgets-deploy.component";
import { ConfigurationWidgetComponent } from "./widgets-configuration/widgets-configuration.component";
import { OperationsWidgetComponent } from "./widgets-operations/widgets-operations.component";
import { AssessmentWidgetComponent } from "./widgets-assessment/widgets-assessment.component";

@NgModule({
  declarations: [
    WidgetsComponent,
    WidgetsBrandComponent,
    WidgetsDropdownComponent,
    ChartSample,
    WidgetsEComponent,
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
    DocsComponentsModule,
    ProgressModule,
    ChartjsModule,
  ],
  exports: [
    WidgetsBrandComponent,
    WidgetsDropdownComponent,
    DeployWidgetComponent,
    ConfigurationWidgetComponent,
    OperationsWidgetComponent,
    AssessmentWidgetComponent,
  ],
})
export class WidgetsModule {}
