import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';
import { AuthService } from './shared/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  page = '';
  routes: Array<string> = [];
  loggedInUser?: firebase.default.User | null;

  /*
  private router: Router
  constructor(router: Router) {
    this.router = router;
  }
  */

  //paraméter adattag
  constructor(
    private router: Router,
    private authService: AuthService
    ) {

  }

  ngOnInit(): void {

    this.routes = this.router.config.map(conf => conf.path) as string[];
    // rx js reaktív programozás
    // subscribe
    this.router.events
    .pipe(filter(event => event instanceof NavigationEnd))
    .subscribe((evts: any) => {
      const currentPage = 
        (evts.urlAfterRedirects as string).split('/')[1] as string;
      
        if (this.routes.includes(currentPage)) {
        this.page = currentPage;
      }
    })

    this.authService
      .isUserLoggedIn()
      .subscribe({
      next: user => {
        this.loggedInUser = user;
        localStorage.setItem('user', JSON.stringify(this.loggedInUser));
      },
      error: (err) => {
        console.error(err);
        localStorage.setItem('user', JSON.stringify('null'));
      }
    });
  }

  changePage(selectedPage: string) {
    //this.page = selectedPage;
    this.router.navigateByUrl(selectedPage)
  }

  onToggleSidenav(sidenav: MatSidenav) {
    sidenav.toggle();
  }

  onClose(event: any, sidenav: MatSidenav) {
    if (event === true) {
      sidenav.close();
    }
  }

  logout(_?: boolean) {
    this.authService.logout()
    .then(() => {
      console.log('Logged out successfully!');
    })
    .catch(err => {
      console.error(err);
    });
  }

  
}

