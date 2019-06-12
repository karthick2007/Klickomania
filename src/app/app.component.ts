import { Component } from '@angular/core';
import {faUser,faSignInAlt} from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: 'pm-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  pageTitle = 'Klickomania';
  faUser = faUser;
  faSignInAlt = faSignInAlt;
}
