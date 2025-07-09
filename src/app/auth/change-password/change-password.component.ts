import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrl: './change-password.component.scss',
  standalone:false

})
export class ChangePasswordComponent {

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
  changePassForm = new FormGroup({
    password: new FormControl(null, [
      Validators.required,
      Validators.pattern(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^a-zA-Z\d]).{3,}$/
      ),
    ]),
      password_new: new FormControl(null, [
      Validators.required,
      Validators.pattern(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^a-zA-Z\d]).{3,}$/
      ),
    ])
  });

  send(data: FormGroup) {
    this.isLoading = true;
    this._authService.changePass(data.value).subscribe({
      next: (res) => {
        console.log(res)
        this.successMessage = res.message;
        this.changePassForm.reset();
        this.isLoading = false;
      },
      error: (err) => {
        console.log(err)
        this.errorMessage = err.message;
        this._toastrService.error('Sorry', this.errorMessage);
        this.isLoading = false;
      },
      complete: () => {
        this._toastrService.success(
          'Success' ,
          this.successMessage
        );
        this.isLoading = false;
        this._router.navigate(['/auth/login']);
      },
    });
  }
}

