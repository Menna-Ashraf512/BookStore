import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrl: './forget-password.component.scss',
  standalone:false
})
export class ForgetPasswordComponent {

  errorMessage: string = '';
  successMessage: string = '';
  isLoading = false;
  constructor(
    private _authService: AuthService,
    private _toastrService: ToastrService,
    private _router:Router
  ) {}

  forgetPassForm = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
  });

  send(data: FormGroup) {
    this.isLoading = true;
    this._authService.forgetPass(data.value).subscribe({
      next: (res) => {
        this.successMessage = res.message;
        this.forgetPassForm.reset();
        this.isLoading = false;
      },
      error: (err) => {
        this.errorMessage = err.error.message;
        this._toastrService.error('Sorry', this.errorMessage);
        this.isLoading = false;
      },
      complete: () => {
        this._toastrService.success('Success' ,this.successMessage);
        this._router.navigate(['/auth/resetPassword'])
        this.isLoading = false;
      },
    });
  }
}

