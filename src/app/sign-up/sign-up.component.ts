import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { debounceTime, catchError, tap } from 'rxjs/operators';
import { HttpClient,HttpHeaders } from "@angular/common/http";
import {Observable} from 'rxjs';


function passwordMatcher(c: AbstractControl): { [key: string]: boolean } | null {
  const passwordControl = c.get('password');
  const confirmPasswordControl = c.get('confirmPassword');

  if (passwordControl.pristine || confirmPasswordControl.pristine) {
    return null;
  }

  if (passwordControl.value === confirmPasswordControl.value) {
    return null;
  }

  if (confirmPasswordControl.value === '') {
    return null;
  }
  return { 'match': true };
}

@Component({
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  signUpForm: FormGroup;
  firstNameMessage: string;
  lastNameMessage: string;
  passwordMessage: string;
  emailMessage:string;
  phoneMessage:string;
  message: string;

  private firstNameValidationMessage = {
    required: "Please enter first Name",
    pattern: "Please enter valid Name"
  };

  private lastNameValidationMessage = {
    required: "Please enter last Name",
    pattern: "Please enter valid Name"
  };

  private passwordValidationMessage = {
    required: "Please enter Password",
    pattern: `Please enter valid password 
    (Atleast one letter, one number, one special characters and be longer than eight charaters)`
  };

  private emailValidationMessage = {
    required: "Please enter email Address",
    email: "Please enter valid email"
  };

  private phoneValidationMessage = {
    required: "Please enter Phone number",
    pattern: "Please enter valid Phone number"
  };


  constructor(private fb: FormBuilder,
              private http:HttpClient) { }

  ngOnInit() {
    this.signUpForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.pattern('^[a-zA-Z]{3,}$')]],
      lastName: ['', [Validators.required, Validators.pattern('^[a-zA-Z]{3,}$')]],
      passwordGroup: this.fb.group({
        password: ['', [Validators.required, Validators.pattern("^(?=.*[0-9]+.*)(?=.*[a-zA-Z]+.*)(?=.*[!@#\$%\^&\*]+.*)[0-9a-zA-Z!@#\$%\^&\*]{8,}$")]],
        confirmPassword: ['', [Validators.required,Validators.pattern("^(?=.*[0-9]+.*)(?=.*[a-zA-Z]+.*)(?=.*[!@#\$%\^&\*]+.*)[0-9a-zA-Z!@#\$%\^&\*]{8,}$")]],
      }, { validator: passwordMatcher }),
      gender: 'male',
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern('^[0-9]{10,10}$')]],
      securityAnswer: ['Please select your Security Question',[Validators.required,Validators.pattern("^(?!.*Please select your Security Question).*$")]],
      answer: ['', Validators.required]

    })

    const firstNameControl = this.signUpForm.get('firstName');
    //this.firstNameMessage = this.valueChange(firstNameControl,this.firstNameValidationMessage);
    firstNameControl.valueChanges.pipe(
      debounceTime(1000)).subscribe(
        value => this.firstNameMessage = this.setMessage(firstNameControl, this.firstNameValidationMessage)
      )
    const lastNameControl = this.signUpForm.get('lastName');
    //this.lastNameMessage = this.valueChange(lastNameControl,this.lastNameValidationMessage);
    lastNameControl.valueChanges.pipe(
      debounceTime(1000)).subscribe(
        value => this.lastNameMessage = this.setMessage(lastNameControl, this.lastNameValidationMessage)
      )
    const passwordControl = this.signUpForm.get('passwordGroup.password');
    passwordControl.valueChanges.pipe(
      debounceTime(1000)).subscribe(
        value => this.passwordMessage = this.setMessage(passwordControl, this.passwordValidationMessage)
      )
      const emailControl = this.signUpForm.get('email');
    emailControl.valueChanges.pipe(
      debounceTime(1000)).subscribe(
        value => this.emailMessage = this.setMessage(emailControl, this.emailValidationMessage)
      )

      const phoneControl = this.signUpForm.get('phone');
    phoneControl.valueChanges.pipe(
      debounceTime(1000)).subscribe(
        value => this.phoneMessage = this.setMessage(phoneControl, this.phoneValidationMessage)
      )




  }

  onSubmit():void{
    let user : Object = {username : this.signUpForm.value.firstName, password : this.signUpForm.value.passwordGroup.password,email : this.signUpForm.value.email};
    this.saveUser(user).subscribe(
      ()=> console.log('upload complete' + user),
      (error:any)=> console.log(error)
    )
  }

  saveUser(p:Object):Observable<Object> {
    //console.log(p);
    const headers = new HttpHeaders({'Content-Type' : 'application/json'});
    return this.http.post<Object>("https://cors-anywhere.herokuapp.com/http://serene-tor-14702.herokuapp.com/signUp",p,{headers : headers});

  }

  /*valueChange(c:AbstractControl,validationMessage:any):string {
    let valueMessage:string = '';
    c.valueChanges.pipe(
      debounceTime(1000)
      ).subscribe(
        value =>  valueMessage = this.setMessage(c,validationMessage)
      );
      return valueMessage;
      
  }*/

  setMessage(c: AbstractControl, validationMessage: any): string {
    this.message = '';
    if ((c.touched || c.dirty) && c.errors) {
      this.message = Object.keys(c.errors).map(
        key => this.message += validationMessage[key]).join(' ');
    }
    return this.message;
  }

}
