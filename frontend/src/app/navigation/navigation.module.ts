import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { TopNavComponent } from './top-nav/top-nav.component';
import { AuthenticationButtonComponent } from './authentication-button/authentication-button.component';
import { LoginButtonComponent } from './login-button/login-button.component';
import { LogoutButtonComponent } from './logout-button/logout-button.component';
import { SignupButtonComponent } from './signup-button/signup-button.component';
import { AuthenticatedNavlinksComponent } from './authenticated-navlinks/authenticated-navlinks.component';
import { LeftNavComponent } from './left-nav/left-nav.component';
import { RouterModule } from '@angular/router';
import { BandModule } from '../band/band.module';

@NgModule({
  declarations: [
    AuthenticatedNavlinksComponent,    
    AuthenticationButtonComponent,
    LoginButtonComponent,
    LogoutButtonComponent,
    SignupButtonComponent,
    TopNavComponent,
    LeftNavComponent
  ],
  imports: [
    SharedModule,
    RouterModule.forChild([]), 
    BandModule
  ],
  exports: [
    TopNavComponent,
    LeftNavComponent
  ]
})
export class NavigationModule { }
