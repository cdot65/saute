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
import { DocsCalloutComponent } from "./docs-callout/docs-callout.component";

@NgModule({
  declarations: [DocsCalloutComponent],
  exports: [DocsCalloutComponent],
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
export class DocsComponentsModule {}
