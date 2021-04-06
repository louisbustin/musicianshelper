import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { AgGridModule } from 'ag-grid-angular';
import { MatDialogModule } from '@angular/material/dialog';
import { appRoutes, appDeclarations } from './app.routes';
import { UserFormComponent } from './admin/users/user-form/user-form.component';
import { UsersComponent } from './admin/users/users.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthModule } from '@auth0/auth0-angular';
import { environment } from '../environments/environment';

import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthHttpInterceptor } from '@auth0/auth0-angular';
import { SharedModule } from './shared/shared.module';
import { NavigationModule } from './navigation/navigation.module';
import { ButtonCellRendererComponent } from './shared/button-cell-renderer/button-cell-renderer.component';


@NgModule({
  declarations: appDeclarations,
  imports: [
    SharedModule,
    NavigationModule,
    MatDialogModule,
    BrowserAnimationsModule,
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    RouterModule.forRoot(
      appRoutes
    ),
    AgGridModule.withComponents([ButtonCellRendererComponent]),
    AuthModule.forRoot({
      ...environment.auth,
      httpInterceptor: {
        allowedList: [
          '/api/users/*', 
          '/api/users', 
          '/api/bands', 
          '/api/bands/*'
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
  entryComponents: [UsersComponent, UserFormComponent]
})
export class AppModule { }
