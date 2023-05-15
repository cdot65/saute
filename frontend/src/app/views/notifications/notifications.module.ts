import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SafeHtmlPipe } from "../../shared/pipes/safe-html.pipe";

import {
  AlertModule,
  BadgeModule,
  ButtonModule,
  CardModule,
  FormModule,
  GridModule,
  ModalModule,
  PopoverModule,
  ProgressModule,
  SharedModule,
  ToastModule,
  TooltipModule,
  UtilitiesModule,
} from "@coreui/angular";

import { IconModule } from "@coreui/icons-angular";

import { DocsComponentsModule } from "@docs-components/docs-components.module";
import { NotificationsRoutingModule } from "./notifications-routing.module";

import { AlertsComponent } from "./alerts/alerts.component";
import { BadgesComponent } from "./badges/badges.component";
import { ModalsComponent } from "./modals/modals.component";
import { ToastersComponent } from "./toasters/toasters.component";
import { ReactiveFormsModule } from "@angular/forms";
import { AppToastComponent } from "./toasters/toast-simple/toast.component";

@NgModule({
  declarations: [
    BadgesComponent,
    AlertsComponent,
    ModalsComponent,
    ToastersComponent,
    AppToastComponent,
    SafeHtmlPipe,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NotificationsRoutingModule,
    DocsComponentsModule,
    AlertModule,
    GridModule,
    CardModule,
    BadgeModule,
    ButtonModule,
    FormModule,
    ModalModule,
    ToastModule,
    SharedModule,
    UtilitiesModule,
    TooltipModule,
    PopoverModule,
    ProgressModule,
    IconModule,
  ],
  exports: [AppToastComponent],
})
export class NotificationsModule {}
