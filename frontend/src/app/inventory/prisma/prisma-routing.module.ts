import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { PrismaCreateComponent } from "./prisma-create/prisma-create.component";
import { PrismaListComponent } from "./prisma-list/prisma-list.component"; // Import the new component

const routes: Routes = [
  {
    path: "",
    component: PrismaListComponent, // Add the route for the new component
  },
  {
    path: "create",
    component: PrismaCreateComponent,
  },
  // Add additional routes as needed
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PrismaRoutingModule {}
