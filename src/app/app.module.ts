import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AppComponent } from './app.component';
import { WelcomeComponent } from './home/welcome.component';
import {PortfolioModule} from "./portfolio/portfolio.module";
import { SignUpModule } from './sign-up/sign-up.module';
import { LoginModule } from "./login/login.module";
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent
    
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot([
      { path: 'welcome', component: WelcomeComponent },
      { path: '', redirectTo: 'welcome', pathMatch: 'full' },
      { path: '**', redirectTo: 'welcome', pathMatch: 'full' }
    ]),
    FontAwesomeModule,
    PortfolioModule,
    SignUpModule,
    LoginModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
