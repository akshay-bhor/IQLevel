import { UnauthorisedError } from './../error/unauth';
import { Injectable } from '@angular/core';
import { NetworkError } from './../error/network-error';
import { BadInput } from './../error/bad-input';
import { NotFoundError } from './../error/not-found-error';
import { AppError } from './../error/app-error';
import { catchError, map } from 'rxjs/operators';
// import { Http, RequestOptions, Headers } from '@angular/http';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { throwError } from 'rxjs';
import { GatewayTimeoutError } from '../error/gateway-timeout-error';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) { }

  post(url, data) {
    return this.http.post<any>(url, JSON.stringify(data)).pipe(
       catchError(this.handleError)
      );
  }

  get(url) {
    return this.http.get<any>(url).pipe(
       catchError(this.handleError)
      );
  }

  authpost(url, data) {
    let headers = new HttpHeaders();
    let token = localStorage.getItem('token');
    headers = headers.append('Authorization', 'Bearer ' + token);

    // let options = new HttpParams({ headers: headers });
    const httpOptions = {
      headers: headers
    };
    

    return this.http.post<any>(url, JSON.stringify(data), httpOptions).pipe(
        catchError(this.handleError)
      );
  }
  authget(url) {
    let headers = new HttpHeaders();
    let token = localStorage.getItem('token');
    headers = headers.append('Authorization', 'Bearer ' + token);

    // let options = new RequestOptions({ headers: headers });
    const httpOptions = {
      headers: headers
    };

    return this.http.get<any>(url, httpOptions).pipe(
        catchError(this.handleError)
      );
  }

  private handleError(error: Response) { 
    if(error.status == 0)
      return throwError(new NetworkError(error));
    if(error.status == 404)
      return throwError(new NotFoundError(error));
    if(error.status == 401) {
      return throwError(new UnauthorisedError(error));
    }
    if(error.status == 504) {
      return throwError(new GatewayTimeoutError(error));
    }
    if(error.status == 400)
      return throwError(new BadInput(error));
    return throwError(new AppError(error));
  }
}
