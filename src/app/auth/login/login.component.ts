import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  standalone: false,
})
export class LoginComponent {

  isShowPass = false;
  errorMessage: string = '';
  successMessage: string = '';
  isLoading = false;


  constructor(
    private _authService: AuthService,
    private _router: Router,
    private _toastrService: ToastrService
  ) {}


  showPass() {
    this.isShowPass = !this.isShowPass;
  }


  loginForm = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [
      Validators.required,
      Validators.pattern(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^a-zA-Z\d]).{3,}$/
      ),
    ]),
  });


  
  send(data: FormGroup) {
    this.isLoading = true;
    this._authService.signIn(data.value).subscribe({
      next: (res) => {
        this.successMessage = res.message;
        if (typeof window !== 'undefined') {
          localStorage.setItem('userToken', res.message);
          localStorage.setItem('firstName', res.message);
        }
        this.loginForm.reset();
        this.isLoading = false;
      },
      error: (err) => {
        this.errorMessage = err.error.message;
        this._toastrService.error('Sorry', this.errorMessage);
        this.isLoading = false;
      },
      complete: () => {
        if (typeof window !== 'undefined') {
        const firstName = localStorage.getItem('firstName');
        this._toastrService.success(
          'Hello' + ' ' + firstName,
          this.successMessage
        );
        this.isLoading = false;
        this._router.navigate(['/home']);
      }
      },
    });
  }
}
