import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { InventoryComponent } from './inventory/inventory.component';
import { PanoramaComponent } from './inventory/panorama/panorama.component';
import { PrismaComponent } from './inventory/prisma/prisma.component';
import { FirewallComponent } from './inventory/firewall/firewall.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { JobsComponent } from './jobs/jobs.component';
import { PanoramaReportsComponent } from './automation-catalog/operational/panorama-reports/panorama-reports.component';
import { JobDetailsComponent } from './jobs/job-details/job-details.component';

const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'jobs', component: JobsComponent, canActivate: [AuthGuard] },
  { path: 'inventory', component: InventoryComponent, canActivate: [AuthGuard] },
  { path: 'inventory/firewall', component: FirewallComponent, canActivate: [AuthGuard] },
  { path: 'inventory/panorama', component: PanoramaComponent, canActivate: [AuthGuard] },
  { path: 'inventory/prisma', component: PrismaComponent, canActivate: [AuthGuard] },
  { path: 'operational/panorama-reports', component: PanoramaReportsComponent, canActivate: [AuthGuard] },
  { path: 'job-details/:id', component: JobDetailsComponent, canActivate: [AuthGuard] },
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
