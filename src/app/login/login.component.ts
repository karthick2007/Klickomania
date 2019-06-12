import { Component, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import {Observable} from 'rxjs';

@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  user:object;

  constructor(private http:HttpClient) { }

  ngOnInit() {
    this.getUserData().subscribe(
      (data:object) => this.user = data[0].username,
      (err:object)=>console.log(err),
      ()=> console.log(this.user)
    )

  }

  getUserData():Observable<object[]>
  {
    return this.http.get<object[]>("https://cors-anywhere.herokuapp.com/http://serene-tor-14702.herokuapp.com/registerData");
  }



}









