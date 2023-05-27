import { RouterModule, Routes } from "@angular/router";

import { CreateScriptComponent } from "./create-script/create-script.component";
import { NgModule } from "@angular/core";
import { TroubleshootComponent } from "./troubleshoot/troubleshoot.component";

const routes: Routes = [
  {
    path: "",
    data: {
      title: "ChatGPT",
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
        path: "troubleshoot",
        component: TroubleshootComponent,
        data: {
          title: "troubleshoot",
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
export class ChatGptRoutingModule {}
