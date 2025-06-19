import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

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
    first_name: new FormControl(null, [Validators.required]),
    last_name: new FormControl(null, [Validators.required]),
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [
      Validators.required,
      Validators.pattern(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^a-zA-Z\d]).{3,}$/
      ),
    ]),
    role: new FormControl('', [Validators.required]),
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
        this.errorMessage = err.error.message;
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
