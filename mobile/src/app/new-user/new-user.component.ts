import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import {UserSignup} from 'src/types/newUser';

@Component({
  selector: 'app-new-user',
  templateUrl: './new-user.component.html',
  styleUrls: ['./new-user.component.scss'],
})
export class NewUserComponent implements OnInit {
  public user: UserSignup = {
    name:'',
    email: '',
    password: '',
  };

  constructor(private auth: AuthService) {}

  ngOnInit(): void {
    console.log('signup');
  }

  public signup() {
    this.auth.register(this.user);
  }
}
