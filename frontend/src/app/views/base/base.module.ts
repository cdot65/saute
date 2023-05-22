import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";

// CoreUI Modules
import {
  AccordionModule,
  BadgeModule,
  BreadcrumbModule,
  ButtonModule,
  CardModule,
  CarouselModule,
  CollapseModule,
  DropdownModule,
  FormModule,
  GridModule,
  ListGroupModule,
  NavModule,
  PaginationModule,
  PlaceholderModule,
  PopoverModule,
  ProgressModule,
  SharedModule,
  SpinnerModule,
  TableModule,
  TabsModule,
  TooltipModule,
  UtilitiesModule,
} from "@coreui/angular";

import { IconModule } from "@coreui/icons-angular";

// utils

// views
import { BreadcrumbsComponent } from "./breadcrumbs/breadcrumbs.component";
import { CardsComponent } from "./cards/cards.component";
import { CollapsesComponent } from "./collapses/collapses.component";
import { ListGroupsComponent } from "./list-groups/list-groups.component";
import { NavsComponent } from "./navs/navs.component";
import { PaginationsComponent } from "./paginations/paginations.component";
import { PlaceholdersComponent } from "./placeholders/placeholders.component";
import { ProgressComponent } from "./progress/progress.component";
import { TablesComponent } from "./tables/tables.component";
import { TooltipsComponent } from "./tooltips/tooltips.component";
import { TabsComponent } from "./tabs/tabs.component";

// Components Routing
import { BaseRoutingModule } from "./base-routing.module";

@NgModule({
  imports: [
    CommonModule,
    BaseRoutingModule,
    AccordionModule,
    BadgeModule,
    BreadcrumbModule,
    ButtonModule,
    CardModule,
    CollapseModule,
    GridModule,
    UtilitiesModule,
    SharedModule,
    ListGroupModule,
    IconModule,
    ListGroupModule,
    PlaceholderModule,
    ProgressModule,
    SpinnerModule,
    TabsModule,
    NavModule,
    TooltipModule,
    CarouselModule,
    FormModule,
    ReactiveFormsModule,
    DropdownModule,
    PaginationModule,
    PopoverModule,
    TableModule,
  ],
  declarations: [
    BreadcrumbsComponent,
    CardsComponent,
    CollapsesComponent,
    ListGroupsComponent,
    NavsComponent,
    PaginationsComponent,
    ProgressComponent,
    TablesComponent,
    TooltipsComponent,
    TabsComponent,
    PlaceholdersComponent,
  ],
})
export class BaseModule {}
