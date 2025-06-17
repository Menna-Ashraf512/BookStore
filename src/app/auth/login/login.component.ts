import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  standalone:false
})
export class LoginComponent {
  isShowPass=false
  errorMessage:string=''
  constructor(
    private _authService:AuthService,
    private _router:Router
  ){}

showPass(){
  this.isShowPass=!this.isShowPass
}
  loginForm = new FormGroup({
    email: new FormControl(null, [Validators.required,Validators.email]),
    password: new FormControl(null, [Validators.required, Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^a-zA-Z\d]).{3,}$/),]),
  });

    send(data: FormGroup) {
    this._authService.signIn(data.value).subscribe({
      next: (res) => {
        localStorage.setItem('userToken',res.data.accessToken)
        this.loginForm.reset();
      },
      error: (err) => {
        this.errorMessage=err.error.message;
      },
      complete: () => {
        console.log('Hello world!', 'Success!');
        this._router.navigate(['/home']);
      },
    });
  }




























}


