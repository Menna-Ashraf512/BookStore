import { Component } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  standalone:false
})
export class LoginComponent {
isShowPass=false
showPass(){
  this.isShowPass=!this.isShowPass
}
}
