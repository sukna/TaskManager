import { Component, OnInit } from '@angular/core';
import { UserService } from './services/index';
import {
  Event,
  NavigationCancel,
  NavigationEnd,
  NavigationError,
  NavigationStart,
  Router,
} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  loading = true;
  logged = false;
  user = null;

  constructor(private router: Router, private userService: UserService) {
    this.router.events.subscribe((event: Event) => {
      switch (true) {
        case event instanceof NavigationStart: {
          this.loading = true;
          break;
        }

        case event instanceof NavigationEnd:
        case event instanceof NavigationCancel:
        case event instanceof NavigationError: {
          this.loading = false;
          break;
        }
        default: {
          break;
        }
      }
    });
  }
  ngOnInit(): void {
    this.userService.currentUser.subscribe(
      (user) => ((this.logged = user != null), (this.user = user))
    );
  }

  logout() {
    this.userService.logout();
  }
}
