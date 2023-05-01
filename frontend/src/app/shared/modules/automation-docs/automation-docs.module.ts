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
import { AutomationExampleComponent } from "./automation-example/automation-example.component";
import { AutomationLinkComponent } from "./automation-link/automation-link.component";
import { AutomationCalloutComponent } from "./automation-callout/automation-callout.component";

@NgModule({
  declarations: [
    AutomationExampleComponent,
    AutomationLinkComponent,
    AutomationCalloutComponent,
  ],
  exports: [
    AutomationExampleComponent,
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
