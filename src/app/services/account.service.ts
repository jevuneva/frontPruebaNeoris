import { HttpClient, HttpErrorResponse, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, Observable, throwError } from 'rxjs';
import { account } from '../models/account';

@Injectable()
export class AccountService {

    endpoint: string = 'http://localhost:8080';

    headers = new HttpHeaders({
      Accept: 'application/json',
      'Content-Type': 'application/json',
      responseType: 'json'
    });
  
    currentUser = {};
  
    constructor(private http: HttpClient, public router: Router ) {}
  
  
    getAcccountAll(): Observable<any> {
      let api = `${this.endpoint}/cuentas/`;
      return this.http.get(api, { headers: this.headers }).pipe(catchError(this.handleError));
    }
  
    inserData(account: any): Observable<HttpResponse<account>> {
      return this.http.post<account>( `${this.endpoint}/cuentas/`,
        JSON.stringify(account), { headers: this.headers, observe: 'response' }).pipe();
    }

    getAcccountByNroAccount(nroAcccount: any): Observable<any> {
      return this.http.get<account>( `${this.endpoint}/cuentas/findByNro/${nroAcccount}`, 
      { headers: this.headers }).pipe(catchError(this.handleError));
    }

    editData(client: any, id: number): Observable<HttpResponse<account>> {
      return this.http.put<account>( `${this.endpoint}/cuentas/${id}`,
        JSON.stringify(client), { headers: this.headers, observe: 'response' }).pipe();
    }

    getReportJson(client: any, fechaIn: String, fechafin: String): Observable<any> {
      return this.http.get<any>( `${this.endpoint}/reportes/?clientId=${client}&fechaIni=${fechaIn}&fechaFin=${fechafin}`,
         { headers: this.headers }).pipe(catchError(this.handleError));
    }

    getReportPdf(client: any, fechaIn: String, fechafin: String): Observable<any> {
      return this.http.get<any>( `${this.endpoint}/reportes/pdf/?clientId=${client}&fechaIni=${fechaIn}&fechaFin=${fechafin}`,
         { headers: this.headers }).pipe();
    }

    handleError(error: HttpErrorResponse) {
        let msg = '';
        if (error.error instanceof ErrorEvent) {
          // client-side error
          msg = error.error.message;
        } else {
          // server-side error
          msg = error.error.message;
          //msg = `Error Code: ${error.status}\nMessage: ${error.message}`;
        }
        return throwError(msg);
      }

}
