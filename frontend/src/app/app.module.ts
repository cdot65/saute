import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './auth.interceptor';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatMenuModule } from '@angular/material/menu';

import { HttpClientModule } from '@angular/common/http';
import { PanoramaComponent } from './panorama/panorama.component';
import { PrismaComponent } from './prisma/prisma.component';
import { HomepageComponent } from './homepage/homepage.component';

import { CookieService } from 'ngx-cookie-service';
import { JobsComponent } from './jobs/jobs.component';
import { PanoramaCreateComponent } from './panorama-create/panorama-create.component';
import { PrismaCreateComponent } from './prisma-create/prisma-create.component';

@NgModule({
  declarations: [
    AppComponent,
    PanoramaComponent,
    PrismaComponent,
    HomepageComponent,
    LoginComponent,
    JobsComponent,
    PanoramaCreateComponent,
    PrismaCreateComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MatToolbarModule,
    MatButtonModule,
    MatInputModule,
    MatCardModule,
    MatTableModule,
    MatSnackBarModule,
    MatMenuModule,
    MatButtonModule,
    HttpClientModule
  ],
  providers: [
    CookieService,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
