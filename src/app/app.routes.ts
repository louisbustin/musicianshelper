import { Routes } from "@angular/router";
import { AdminComponent } from "./admin/admin.component";
import { UsersComponent } from "./admin/users/users.component";
import { PageNotFoundComponent } from "./page-not-found/page-not-found.component";
import { PublicComponent } from "./public/public.component";
import { UserFormComponent } from './admin/users/user-form/user-form.component';
import { ProfilePageComponent } from "./public/pages/profile-page/profile-page.component";
import { AuthGuard } from '@auth0/auth0-angular';
import { NewsComponent } from "./public/news/news.component";

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
    {
      path: 'setlists',
      canActivate: [AuthGuard],
      loadChildren: () => import('./setlists/setlists.module').then(m => m.SetlistsModule)
    },
    { path: 'news', component: NewsComponent },
    { path: 'profile', component: ProfilePageComponent, canActivate: [AuthGuard] },
    { path: '', component: PublicComponent },
    { path: '**', component: PageNotFoundComponent }
  ];
