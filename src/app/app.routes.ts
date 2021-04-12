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
    { path: 'news', component: NewsComponent },
    { path: 'profile', component: ProfilePageComponent, canActivate: [AuthGuard] },
    { 
      path: 'band', 
      canActivate: [AuthGuard], 
      data: { preload: false }, 
      loadChildren: () =>
        import('./band/band.module').then(m => m.BandModule)
    },
    { path: '', component: PublicComponent },
    { path: '**', component: PageNotFoundComponent }
  ];
