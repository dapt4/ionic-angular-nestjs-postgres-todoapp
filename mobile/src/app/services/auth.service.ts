import { Injectable } from '@angular/core';
import { BASE_URL } from '../config/config';
import { HttpClient } from '@angular/common/http';
import { LoginRes, UserAuth } from 'src/types/login';
import { Router } from '@angular/router';
import { SignupRes, UserSignup } from 'src/types/newUser';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient, private router: Router) {}

  public login(body: UserAuth) {
    const url = BASE_URL + '/auth/login';
    this.http.post<LoginRes>(url, body).subscribe({
      next: (data: LoginRes) => {
        sessionStorage.setItem('authToken', data.token);
        this.router.navigate(['/pages/list']);
      },
      error: (err) => {
        console.error(err);
      },
    });
  }

  public logout() {
    sessionStorage.removeItem('authToken');
    this.router.navigate(['/login']);
  }

  public register(body: UserSignup) {
    const url = BASE_URL + '/auth/register';
    this.http.post<SignupRes>(url, body).subscribe({
      next: (data: SignupRes) => {
        this.router.navigate(['/login']);
        return data
      },
      error: (err) => {
        console.error(err);
      },
    });
  }
}
