import { RouterModule, Routes } from "@angular/router";

import { ChangeAnalysisComponent } from "./change-analysis/change-analysis.component";
import { CreateScriptComponent } from "./create-script/create-script.component";
import { NgModule } from "@angular/core";

const routes: Routes = [
  {
    path: "",
    data: {
      title: "AI",
    },
    children: [
      {
        path: "",
        redirectTo: "create-script",
        pathMatch: "full",
      },
      {
        path: "create-script",
        component: CreateScriptComponent,
        data: {
          title: "create-script",
        },
      },
      {
        path: "change-analysis",
        component: ChangeAnalysisComponent,
        data: {
          title: "change-analysis",
        },
      },
      {
        path: "**",
        redirectTo: "history",
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AiRoutingModule {}
