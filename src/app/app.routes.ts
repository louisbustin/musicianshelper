import { Routes } from "@angular/router";
import { AdminComponent } from "./admin/admin.component";
import { UsersComponent } from "./admin/users/users.component";
import { PageNotFoundComponent } from "./page-not-found/page-not-found.component";
import { PublicComponent } from "./public/public.component";
import { UserFormComponent } from './admin/users/user-form/user-form.component';
import { AppComponent } from "./app.component";
import { ButtonCellRendererComponent } from './button-cell-renderer.component';


export const appRoutes: Routes = [
    { 
      path: 'admin', 
      component: AdminComponent, 
      children: [
        { path: 'users', component: UsersComponent },
        { path: 'users/edit', component: UserFormComponent }
      ]
    
    },
    { path: '', component: PublicComponent },
    { path: '**', component: PageNotFoundComponent }
  ];

  export const appDeclarations = [    
        AppComponent,
        PublicComponent,
        AdminComponent,
        PageNotFoundComponent,
        UsersComponent,
        UserFormComponent,
        ButtonCellRendererComponent
  ]