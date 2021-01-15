import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { AdminComponent } from './admin/admin.component'
import { UsersComponent } from './admin/users/users.component';
import { PublicComponent } from './public/public.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { HttpClientModule } from '@angular/common/http';
import { AgGridModule } from 'ag-grid-angular';
import { CommonModule } from '@angular/common';

const appRoutes: Routes = [
  { 
    path: 'admin', 
    component: AdminComponent, 
    children: [
      { path: 'users', component: UsersComponent }
    ]
  
  },
  { path: '', component: PublicComponent },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  declarations: [
    
    AppComponent,
    PublicComponent,
    AdminComponent,
    PageNotFoundComponent,
    UsersComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    RouterModule.forRoot(
      appRoutes
    ),
    AgGridModule.withComponents([])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
