import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
  standalone: false,
})
export class RegisterComponent {


  isShowPass = false;
  errorMessage: string = '';
  successMessage:string=''
  isLoading = false;

  constructor(
    private _authService: AuthService,
    private _router: Router,
    private _toastrService:ToastrService,
  ) {}

  showPass() {
    this.isShowPass = !this.isShowPass;
  }



  registerForm = new FormGroup({
    firstName: new FormControl(null, [Validators.required]),
    lastName: new FormControl(null, [Validators.required]),
    userName: new FormControl(null, [Validators.required]),
    password: new FormControl(null, [
      Validators.required,
      Validators.pattern(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^a-zA-Z\d]).{3,}$/
      ),
    ]),
    email: new FormControl(null, [Validators.required, Validators.email]),
    phone: new FormControl(null, [Validators.required, Validators.pattern(/^[0-9]{10}$/)]),
    age: new FormControl(null, [Validators.required, Validators.min(1), Validators.max(100)]),
  });




  register(data: FormGroup) {
    this.isLoading=true
    this._authService.register(data.value).subscribe({
      next: (res) => {
        console.log(res)
        this.registerForm.reset();
        this.successMessage = res.message;
        this.isLoading = false;

      },
      error: (err) => {
        this.errorMessage = err.errors?.message || 'An error occurred during registration.';
        this._toastrService.error(this.errorMessage,'Sorry');
        this.isLoading = false;
      },
      complete: () => {
        this.isLoading = false;
        this._toastrService.success(this.successMessage,'Success');
        this._router.navigate(['/auth/login']);
      },
    });
  }
}
