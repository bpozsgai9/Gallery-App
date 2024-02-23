import { Injectable } from '@angular/core';
import { Observable, Subscriber } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FakeLoadingService {

  constructor() { }

  // CRUD (create, read, update, delete)

  loadingWithPromise(email: string, password: string): Promise<boolean> {

    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (email === 'example@example.com' && password === 'example') {
          resolve(true);
        } else {
          reject(false);
        }
      }, 3000)
    });
  }

  loadingWithObservable(email: string, password: string): Observable<boolean> {
    
    // data stream
    return new Observable((subscriber: Subscriber<boolean>) => {

      let i = 0;
      const interval = setInterval(() => {
        i++;
        //subscriber.next(i);
        if (email === 'example@example.com' && password === 'example') {
          subscriber.next(true);
          subscriber.complete();
        } else {
          subscriber.error(false);
        }
      }, 1000)
    });
  }
}
