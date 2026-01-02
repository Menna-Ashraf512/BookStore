import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { IAuth } from '../../interfaces/iauth';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-profile',
  imports: [RouterLink],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
})
export class ProfileComponent implements OnInit {
  list: IAuth = {} as IAuth;
  constructor(private _router: Router, private _authService: AuthService) {}
  ngOnInit(){
    this.profile();
  }
  goToChangePass() {
    this._router.navigate(['/auth/changePassword']);
  }

  profile(){
    this.list=this._authService.profileSubject.getValue();
    console.log(this.list);
  }
}
