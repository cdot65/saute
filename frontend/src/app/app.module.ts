import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { LoginComponent } from './login/login.component';
import { AuthInterceptor } from './auth.interceptor';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatOptionModule } from '@angular/material/core';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSortModule } from '@angular/material/sort';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';

import { HttpClientModule } from '@angular/common/http';
import { PanoramaComponent } from './inventory/panorama/panorama.component';
import { PrismaComponent } from './inventory/prisma/prisma.component';

import { CookieService } from 'ngx-cookie-service';
import { JobsComponent } from './jobs/jobs.component';
import { InventoryComponent } from './inventory/inventory.component';
import { EditEntryComponent } from './inventory/shared/edit-entry/edit-entry.component';
import { CreateEntryComponent } from './inventory/shared/create-entry/create-entry.component';
import { FirewallComponent } from './inventory/firewall/firewall.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { JobDetailsComponent } from './jobs/job-details/job-details.component';
import { ConfigPanosComponent } from './automation-catalog/configuration/config-panos/config-panos.component';
import { ConfigPanoramaComponent } from './automation-catalog/configuration/config-panorama/config-panorama.component';
import { ConfigPrismaComponent } from './automation-catalog/configuration/config-prisma/config-prisma.component';
import { DiffsyncPanoramaPrismaComponent } from './automation-catalog/configuration/diffsync-panorama-prisma/diffsync-panorama-prisma.component';
import { DiffsyncPanoramaPanoramaComponent } from './automation-catalog/configuration/diffsync-panorama-panorama/diffsync-panorama-panorama.component';
import { PanosCommandsComponent } from './automation-catalog/operational/panos-commands/panos-commands.component';
import { PanosReportsComponent } from './automation-catalog/operational/panos-reports/panos-reports.component';
import { PanoramaReportsComponent } from './automation-catalog/operational/panorama-reports/panorama-reports.component';
import { PanosRebootComponent } from './automation-catalog/maintenance/panos-reboot/panos-reboot.component';
import { PanoramaRebootComponent } from './automation-catalog/maintenance/panorama-reboot/panorama-reboot.component';
import { JobDialogComponent } from './shared/job-dialog/job-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    PanoramaComponent,
    PrismaComponent,
    LoginComponent,
    JobsComponent,
    InventoryComponent,
    EditEntryComponent,
    CreateEntryComponent,
    FirewallComponent,
    DashboardComponent,
    JobDetailsComponent,
    ConfigPanosComponent,
    ConfigPanoramaComponent,
    ConfigPrismaComponent,
    DiffsyncPanoramaPrismaComponent,
    DiffsyncPanoramaPanoramaComponent,
    PanosCommandsComponent,
    PanosReportsComponent,
    PanoramaReportsComponent,
    PanosRebootComponent,
    PanoramaRebootComponent,
    JobDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatCardModule,
    MatDialogModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatOptionModule,
    MatPaginatorModule,
    MatSelectModule,
    MatSidenavModule,
    MatSortModule,
    MatSnackBarModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
    HttpClientModule
  ],
  providers: [
    CookieService,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
