import { Routes } from "@angular/router";
import { AdminComponent } from "./admin/admin.component";
import { UsersComponent } from "./admin/users/users.component";
import { PageNotFoundComponent } from "./page-not-found/page-not-found.component";
import { PublicComponent } from "./public/public.component";
import { UserFormComponent } from './admin/users/user-form/user-form.component';
import { AppComponent } from "./app.component";
import { ButtonCellRendererComponent } from './button-cell-renderer.component';
import { AuthenticationButtonComponent } from './components/authentication-button/authentication-button.component';
import { LoginButtonComponent } from './components/login-button/login-button.component';
import { LogoutButtonComponent } from './components/logout-button/logout-button.component';
import { SignupButtonComponent } from './components/signup-button/signup-button.component';
import { ProfilePageComponent } from "./public/pages/profile-page/profile-page.component";
import { AuthGuard } from '@auth0/auth0-angular';
import { AuthenticatedNavlinksComponent } from "./components/authenticated-navlinks/authenticated-navlinks.component";
import { TopNavComponent } from "./components/top-nav/top-nav.component";
import { GroupsPageComponent } from "./public/pages/groups-page/groups-page.component";
import { GroupsFormComponent } from "./public/pages/groups-page/groups-form/groups-form.component";
import { GroupDetailsComponent } from "./public/pages/groups-page/group-details/group-details.component";


export const appRoutes: Routes = [
    { 
      path: 'admin', 
      component: AdminComponent, 
      children: [
        { path: 'users', component: UsersComponent },
        { path: 'users/edit', component: UserFormComponent }
      ],
      canActivate: [AuthGuard]    
    },
    { path: 'profile', component: ProfilePageComponent, canActivate: [AuthGuard]},
    { path: 'groups', component: GroupsPageComponent, canActivate: [AuthGuard]},
    { path: 'groups/:id', component: GroupDetailsComponent, canActivate: [AuthGuard]},
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
        ButtonCellRendererComponent,
        AuthenticationButtonComponent,
        LoginButtonComponent,
        LogoutButtonComponent,
        SignupButtonComponent,
        ProfilePageComponent,
        AuthenticatedNavlinksComponent,
        TopNavComponent,
        GroupsPageComponent,
        GroupsFormComponent,
        GroupDetailsComponent
  ]