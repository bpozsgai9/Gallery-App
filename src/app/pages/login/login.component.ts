import { Component, OnDestroy } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { FakeLoadingService } from '../../shared/services/fake-loading.service';
import { Observable, Subscription } from 'rxjs';
import { AuthService } from '../../shared/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnDestroy {

  email = new FormControl('');
  password = new FormControl('');
  loading = false;

  loadingSubscription?: Subscription;
  loadingObservation?: Observable<boolean>;

  constructor(
    private router: Router,
    private loadingService: FakeLoadingService,
    private authService: AuthService) { }

  login() {

    //Promise
    /*
    this.loadingService
    .loadingWithPromise(this.email.value as string, this.password.value as string)
    //a resolve-ban megkapott érték, azért _ mert nem használom anonim
    .then((_: boolean) => {

      console.log('This executed second!');
      this.router.navigateByUrl('/main');

    }).catch(error => {

      console.error('Incorrect email or password!');

    }).finally(() => {

      console.log('This executed finally!');

    });
    console.log('This executed first!');
    */

    //async-await
    /*
    try {
      
      const _ = await this.loadingService
      .loadingWithPromise(this.email.value as string, this.password.value as string)
      this.router.navigateByUrl('/main');

    } catch (error) {
      console.error(error, 'Incorrect email or password!');
    }
    console.log('This executed finally!');
    */

    // Observable
    // memory leak
    
    /*
    this.loading = true;
    this.loadingObservation = this.loadingService
    .loadingWithObservable(this.email.value as string, this.password.value as string)
    
    this.loadingSubscription =
      this.loadingObservation.subscribe({
        next: (data: boolean) => {
          console.log(data);
          this.router.navigateByUrl('/main');
        },
        error: (error) => {
          console.error(error);
          this.loading = false;
        },
        complete() {
          console.log('finally block')
        }
      });
      */

      // IGAZI
      this.authService.login(this.email.value as string, this.password.value as string)
      .then(cred => {
        console.log(cred);
        this.router.navigateByUrl('/main');
        this.loading = false;
      })
      .catch(err => {
        console.error(err);
        this.loading = false;
      });
  }

  ngOnDestroy(): void {
    this.loadingSubscription?.unsubscribe();
  }
}
