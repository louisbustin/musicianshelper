import { Routes } from "@angular/router";
import { PageNotFoundComponent } from "./page-not-found/page-not-found.component";
import { PublicComponent } from "./public/public.component";
import { AuthGuard } from '@auth0/auth0-angular';
import { PrivacyComponent } from './public/privacy/privacy.component';
import { TosComponent } from './public/tos/tos.component';

export const appRoutes: Routes = [
    {
      path: 'setlists',
      canActivate: [AuthGuard],
      loadChildren: () => import('./setlists/setlists.module').then(m => m.SetlistsModule)
    },
    {
      path: 'songs',
      canActivate: [AuthGuard],
      loadChildren: () => import('./songs/songs.module').then(m => m.SongsModule)
    },
    { path: 'news', 
      loadChildren: () => import('./news/news.module').then(m => m.NewsModule)
    },
    { path: 'privacy', component: PrivacyComponent},
    { path: 'tos', component: TosComponent},
    { path: '', component: PublicComponent },
    { path: '**', component: PageNotFoundComponent }
  ];
