import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { PortfolioComponent } from './portfolio.component';

@NgModule({
  declarations: [
    PortfolioComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forChild([
      { path: 'portfolio', component: PortfolioComponent },
    ]),
    FontAwesomeModule
  ]
})
export class PortfolioModule { }