import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.scss',
  standalone:false
})
export class ResetPasswordComponent {

 isShowPass = false;
  errorMessage: string = '';
  successMessage: string = '';
  isLoading = false;
  constructor(
    private _authService: AuthService,
    private _toastrService: ToastrService
  ) {}

  showPass() {
    this.isShowPass = !this.isShowPass;
  }
  resetPassForm = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    otp: new FormControl(null, [Validators.required, Validators.pattern(/^\d{6}$/)]),
    password: new FormControl(null, [
      Validators.required,
      Validators.pattern(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^a-zA-Z\d]).{3,}$/
      ),
    ]),
  });

  send(data: FormGroup) {
    this.isLoading = true;
    this._authService.resetPass(data.value).subscribe({
      next: (res) => {
        this.successMessage = res.message;
        this.resetPassForm.reset();
        this.isLoading = false;
      },
      error: (err) => {
        this.errorMessage = err.message;
        this._toastrService.error('Sorry', this.errorMessage);
        this.isLoading = false;
      },
      complete: () => {
        this._toastrService.success(
          'Success',
          this.successMessage
        );
        this.isLoading = false;
      },
    });
  }
}
