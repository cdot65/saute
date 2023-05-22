import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";

import {
  CalloutModule,
  NavModule,
  TabsModule,
  UtilitiesModule,
} from "@coreui/angular";

import { IconModule } from "@coreui/icons-angular";
import { AutomationExecuteComponent } from "./automation-execute/automation-execute.component";
import { AutomationLinkComponent } from "./automation-link/automation-link.component";
import { AutomationCalloutComponent } from "./automation-callout/automation-callout.component";

@NgModule({
  declarations: [
    AutomationExecuteComponent,
    AutomationLinkComponent,
    AutomationCalloutComponent,
  ],
  exports: [
    AutomationExecuteComponent,
    AutomationLinkComponent,
    AutomationCalloutComponent,
  ],
  imports: [
    CommonModule,
    NavModule,
    IconModule,
    RouterModule,
    TabsModule,
    UtilitiesModule,
    CalloutModule,
  ],
})
export class AutomationDocsModule {}
