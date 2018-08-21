import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Email } from './email';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json'
  })
};

@Injectable()
export class SubService {
  url = 'http://localhost:8055/v1/subscriptions/add';
  constructor(private http: HttpClient) {}

  /** POST: add a new subscriber */
  sub (email: Email): Observable<Email> {
    return this.http.post<Email>(this.url, email, httpOptions)
      .pipe(
        // Error Observable
      );
  }
}