import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {LoginComponent} from '././login.component';


@NgModule({
  declarations: [
   LoginComponent
  ],
  imports: [
    HttpClientModule,
    RouterModule.forChild([
      { path: 'login', component: LoginComponent },
    ]),
    FontAwesomeModule
  ]
})
export class LoginModule { }