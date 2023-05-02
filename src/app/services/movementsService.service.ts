import { HttpClient, HttpErrorResponse, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, Observable, throwError } from 'rxjs';
import { movements } from '../models/movements';

@Injectable()
export class MovementsServiceService {

endpoint: string = 'http://localhost:8080';

headers = new HttpHeaders({
  Accept: 'application/json',
  'Content-Type': 'application/json',
  responseType: 'json'
});

currentUser = {};

constructor(private http: HttpClient, public router: Router ) {}


getMovementAll(): Observable<any> {
  let api = `${this.endpoint}/movimientos/`;
  return this.http.get(api, { headers: this.headers }).pipe(catchError(this.handleError));
}

inserData(client: any): Observable<HttpResponse<movements>> {
  return this.http.post<movements>( `${this.endpoint}/movimientos/`,
    JSON.stringify(client), { headers: this.headers, observe: 'response' }).pipe(catchError(this.handleError));
}

editData(client: any, id: number): Observable<HttpResponse<movements>> {
  return this.http.put<movements>( `${this.endpoint}/movimientos/${id}`,
    JSON.stringify(client), { headers: this.headers, observe: 'response' }).pipe(catchError(this.handleError));
}

handleError(error: HttpErrorResponse) {
    let msg = '';
    if (error.error instanceof ErrorEvent) {
      // client-side error
      msg = error.error.message;
    } else {
      // server-side error
     // msg = `Error Code: ${error.status}\nMessage: ${error.message}`;
     msg = error.error.message;
    }
    return throwError(msg);
  }
}
