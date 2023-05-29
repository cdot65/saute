import { RouterModule, Routes } from "@angular/router";

import { BreadcrumbsComponent } from "./breadcrumbs/breadcrumbs.component";
import { CardsComponent } from "./cards/cards.component";
import { CollapsesComponent } from "./collapses/collapses.component";
import { ListGroupsComponent } from "./list-groups/list-groups.component";
import { NavsComponent } from "./navs/navs.component";
import { NgModule } from "@angular/core";
import { PaginationsComponent } from "./paginations/paginations.component";
import { PlaceholdersComponent } from "./placeholders/placeholders.component";
import { TablesComponent } from "./tables/tables.component";
import { TabsComponent } from "./tabs/tabs.component";
import { TooltipsComponent } from "./tooltips/tooltips.component";

const routes: Routes = [
  {
    path: "",
    data: {
      title: "Base",
    },
    children: [
      {
        path: "",
        pathMatch: "full",
        redirectTo: "cards",
      },
      {
        path: "breadcrumbs",
        component: BreadcrumbsComponent,
        data: {
          title: "Breadcrumbs",
        },
      },
      {
        path: "cards",
        component: CardsComponent,
        data: {
          title: "Cards",
        },
      },
      {
        path: "collapse",
        component: CollapsesComponent,
        data: {
          title: "Collapse",
        },
      },
      {
        path: "list-group",
        component: ListGroupsComponent,
        data: {
          title: "List Group",
        },
      },
      {
        path: "navs",
        component: NavsComponent,
        data: {
          title: "Navs & Tabs",
        },
      },
      {
        path: "pagination",
        component: PaginationsComponent,
        data: {
          title: "Pagination",
        },
      },
      {
        path: "placeholder",
        component: PlaceholdersComponent,
        data: {
          title: "Placeholder",
        },
      },
      {
        path: "tables",
        component: TablesComponent,
        data: {
          title: "Tables",
        },
      },
      {
        path: "tabs",
        component: TabsComponent,
        data: {
          title: "Tabs",
        },
      },
      {
        path: "tooltips",
        component: TooltipsComponent,
        data: {
          title: "Tooltips",
        },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BaseRoutingModule {}
