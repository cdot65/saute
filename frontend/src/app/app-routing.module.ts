import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PanoramaComponent } from './inventory/panorama/panorama.component';
import { PrismaComponent } from './inventory/prisma/prisma.component';
import { LoginComponent } from './login/login.component';
import { HomepageComponent } from './homepage/homepage.component';
import { JobsComponent } from './jobs/jobs.component';
import { AuthGuard } from './auth.guard';
import { PanoramaCreateComponent } from './panorama-create/panorama-create.component';
import { PrismaCreateComponent } from './prisma-create/prisma-create.component';
import { InventoryComponent } from './inventory/inventory.component';

const routes: Routes = [
  { path: '', component: HomepageComponent },
  { path: 'login', component: LoginComponent },
  { path: 'inventory', component: InventoryComponent },
  { path: 'panorama', component: PanoramaComponent, canActivate: [AuthGuard] },
  { path: 'prisma', component: PrismaComponent, canActivate: [AuthGuard] },
  { path: 'jobs', component: JobsComponent, canActivate: [AuthGuard] },
  { path: 'panorama/create', component: PanoramaCreateComponent, canActivate: [AuthGuard] },
  { path: 'prisma/create', component: PrismaCreateComponent, canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
