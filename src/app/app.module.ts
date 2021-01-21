import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
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
    AgGridModule.withComponents([ButtonCellRendererComponent])
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [UsersComponent, UserFormComponent]
})
export class AppModule { }
