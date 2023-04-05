import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PanoramaComponent } from './panorama/panorama.component';
import { PrismaComponent } from './prisma/prisma.component';
import { LoginComponent } from './login/login.component';
import { HomepageComponent } from './homepage/homepage.component';
import { JobsComponent } from './jobs/jobs.component';
import { AuthGuard } from './auth.guard';

const routes: Routes = [
  { path: '', component: HomepageComponent },
  { path: 'login', component: LoginComponent },
  { path: 'panorama', component: PanoramaComponent, canActivate: [AuthGuard] },
  { path: 'prisma', component: PrismaComponent, canActivate: [AuthGuard] },
  { path: 'jobs', component: JobsComponent, canActivate: [AuthGuard] }, // Add this line
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
