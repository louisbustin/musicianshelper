import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { AgGridModule } from 'ag-grid-angular';
import { MatDialogModule } from '@angular/material/dialog';
import { appRoutes } from './app.routes';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthModule } from '@auth0/auth0-angular';
import { environment } from '../environments/environment';

import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthHttpInterceptor } from '@auth0/auth0-angular';
import { SharedModule } from './shared/shared.module';
import { NavigationModule } from './navigation/navigation.module';
import { ButtonCellRendererComponent } from './shared/button-cell-renderer/button-cell-renderer.component';
import { PublicComponent } from './public/public.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { BandModule } from './band/band.module';
import { PrivacyComponent } from './public/privacy/privacy.component';
import { TosComponent } from './public/tos/tos.component';

@NgModule({
  declarations: [
    AppComponent,
    PublicComponent,
    PageNotFoundComponent,
    PrivacyComponent,
    TosComponent,
  ],
  imports: [
    SharedModule,
    NavigationModule,
    MatDialogModule,
    BrowserAnimationsModule,
    BrowserModule,
    RouterModule.forRoot(
      appRoutes,
      {scrollPositionRestoration: 'enabled'}
      ),
    BandModule,
    AgGridModule.withComponents([ButtonCellRendererComponent]),
    AuthModule.forRoot({
      ...environment.auth,
      httpInterceptor: {
        allowedList: [
          `${environment.API_URL}/setlists*`,
          `${environment.API_URL}/bands*`,
          `${environment.API_URL}/songs*`,
        ],
      },
    })
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: AuthHttpInterceptor,
    multi: true,
  }
],
  bootstrap: [AppComponent],
})
export class AppModule { }
