import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import {
    HttpClient,
    HttpHeaders,
    HttpErrorResponse,
    HttpResponse,
  } from '@angular/common/http';

  import { Router } from '@angular/router';
import { client } from '../models/client';

@Injectable()
export class ClientService {

    endpoint: string = 'http://localhost:8080';

    headers = new HttpHeaders({
      Accept: 'application/json',
      'Content-Type': 'application/json',
      responseType: 'json'
    });
  
    currentUser = {};
  
    constructor(private http: HttpClient, public router: Router ) {}
  
  
    getClientAll(): Observable<any> {
      let api = `${this.endpoint}/clientes/`;
      return this.http.get(api, { headers: this.headers }).pipe(catchError(this.handleError));
    }

    getClientbyIdent(id: number): Observable<any> {
      let api = `${this.endpoint}/clientes/byIdent/${id}`;
      return this.http.get(api, { headers: this.headers }).pipe(catchError(this.handleError));
    }
  
    inserData(client: any): Observable<HttpResponse<client>> {
      return this.http.post<client>( `${this.endpoint}/clientes/`,
        JSON.stringify(client), { headers: this.headers, observe: 'response' }).pipe(catchError(this.handleError));
    }

    editData(client: any, id: number): Observable<HttpResponse<client>> {
      return this.http.put<client>( `${this.endpoint}/clientes/${id}`,
        JSON.stringify(client), { headers: this.headers, observe: 'response' }).pipe(catchError(this.handleError));
    }
  /*
    getImprimir(recep: any): Observable<HttpResponse<Pdf>> {
   
      return this.http.get<Pdf>( `${this.endpoint}/recepPDF?sede=${recep.sede}&recep=${recep.recep}`, { headers: this.headers, observe: 'response' });
    }
  
    getPdfbyId(recep: any): Observable<HttpResponse<Pdf>> {
   
      return this.http.get<Pdf>( `${this.endpoint}/impPDF/${recep}`, { headers: this.headers, observe: 'response' });
    }
  
    getPerson(cod: any): Observable<HttpResponse<Person>>{
      let per = new Person();
      per.personCodigo = cod;
      return this.http.post<Person>( `${this.endpoint}/person/personCodigo/`,
      JSON.stringify(per), { headers: this.headers, observe: 'response' }).pipe();
    }*/
  
    
    // Error
    handleError(error: HttpErrorResponse) {
      let msg = '';
      if (error.error instanceof ErrorEvent) {
        // client-side error
        msg = error.error.message;
      } else {
        // server-side error
        msg = `Error Code: ${error.status}\nMessage: ${error.message}`;
      }
      return throwError(msg);
    }
    
}
