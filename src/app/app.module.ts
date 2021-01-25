import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { AgGridModule } from 'ag-grid-angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { appRoutes, appDeclarations } from './app.routes';
import { UserFormComponent } from './admin/users/user-form/user-form.component';
import { UsersComponent } from './admin/users/users.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ButtonCellRendererComponent } from './button-cell-renderer.component';
import { AuthModule } from '@auth0/auth0-angular';
import { environment } from '../environments/environment';

import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthHttpInterceptor } from '@auth0/auth0-angular';


@NgModule({
  declarations: appDeclarations,
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
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
        allowedList: [`http://localhost:4200/api/users`],
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
