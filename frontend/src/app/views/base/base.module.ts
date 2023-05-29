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

// Components Routing
import { BaseRoutingModule } from "./base-routing.module";
// views
import { BreadcrumbsComponent } from "./breadcrumbs/breadcrumbs.component";
import { CardsComponent } from "./cards/cards.component";
import { CollapsesComponent } from "./collapses/collapses.component";
import { CommonModule } from "@angular/common";
import { IconModule } from "@coreui/icons-angular";
import { ListGroupsComponent } from "./list-groups/list-groups.component";
import { NavsComponent } from "./navs/navs.component";
import { NgModule } from "@angular/core";
import { PaginationsComponent } from "./paginations/paginations.component";
import { PlaceholdersComponent } from "./placeholders/placeholders.component";
import { ReactiveFormsModule } from "@angular/forms";
import { TablesComponent } from "./tables/tables.component";
import { TabsComponent } from "./tabs/tabs.component";
import { TooltipsComponent } from "./tooltips/tooltips.component";

// utils

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
    TablesComponent,
    TooltipsComponent,
    TabsComponent,
    PlaceholdersComponent,
  ],
})
export class BaseModule {}
