import { Component } from '@angular/core';
import { UserAuth } from 'src/types/login';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  public user: UserAuth = {
    username: '',
    password: '',
  };

  constructor(private auth: AuthService) {}

  public signin() {
    this.auth.login(this.user);
  }

}
