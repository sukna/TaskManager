import { Injectable } from '@angular/core';
import { User } from '../_models';
import { BehaviorSubject, Observable } from 'rxjs';
import { Router } from '@angular/router';
import $axios from '../general/axios/axios';
import { NotifyService } from './notify.service';
import { SocialAuthService } from 'angularx-social-login';
import { GoogleLoginProvider } from 'angularx-social-login';

@Injectable({ providedIn: 'root' })
export class UserService {
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;

  constructor(
    private notifyService: NotifyService,
    private authService: SocialAuthService,
    private router: Router
  ) {
    this.currentUserSubject = new BehaviorSubject<User>(
      JSON.parse(localStorage.getItem('currentUser'))
    );
    this.currentUser = this.currentUserSubject.asObservable();

    this.authService.authState.subscribe((user) => {
      if (user != null) {
        $axios
          .post('auth/google-auth', { token: user.idToken })
          .then((response) => {
            localStorage.setItem('currentUser', JSON.stringify(response.data));
            this.currentUserSubject.next(response.data);
            this.notifyService.success('Welcome to TaskManagerApp');
            this.router.navigate(['/']);
          })
          .catch((error) => {
            this.notifyService.error(error);
          });
      }
    });
  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  public login(email: string, password: string): Observable<any> {
    return new Observable((observer) => {
      $axios
        .post('auth/login', { email, password })
        .then((response) => {
          localStorage.setItem('currentUser', JSON.stringify(response.data));
          this.currentUserSubject.next(response.data);
          this.notifyService.success('Welcome to TaskManagerApp');
          this.router.navigate(['/']);
        })
        .catch((error) => {
          this.notifyService.error(error.response.data.message);
        })
        .finally(() => {
          observer.next();
        });
    });
  }

  public isAuthenticated(): boolean {
    return this.currentUserValue != null;
  }

  public register(
    firstName: string,
    lastName: string,
    email: string,
    password: string
  ): Observable<any> {
    return new Observable((observer) => {
      $axios
        .post('auth/register', { firstName, lastName, email, password })
        .then((response) => {
          this.notifyService.success('Success registration. Please login.');
          this.router.navigate(['/login']);
        })
        .catch((error) => {
          this.notifyService.error(error.response.data.message);
        })
        .finally(() => {
          observer.next();
        });
    });
  }

  public signInWithGoogle(): Observable<any> {
    return new Observable((observer) => {
      this.authService
        .signIn(GoogleLoginProvider.PROVIDER_ID)
        .finally(() => observer.complete());
    });
  }

  public logout() {
    this.currentUserSubject.next(null);
    localStorage.removeItem('currentUser');
    this.router.navigate(['/login']);
  }
}
