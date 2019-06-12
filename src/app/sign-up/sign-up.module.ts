import { NgModule } from '@angular/core';
import {CommonModule} from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {SignUpComponent} from './sign-up.component';
import {ReactiveFormsModule} from '@angular/forms'


@NgModule({
  declarations: [
   SignUpComponent
  ],
  imports: [
   CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      { path: 'signUp', component: SignUpComponent },
    ]),
    FontAwesomeModule
  ]
})
export class SignUpModule { }