import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
// import { Http, RequestOptions, Headers } from '@angular/http';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { throwError } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient, private authService: AuthService) { }

  post(url, data) {
    return this.http.post<any>(url, JSON.stringify(data)).pipe(
       catchError((err) =>this.handleError(err))
      );
  }

  get(url) {
    return this.http.get<any>(url).pipe(
       catchError((err) =>this.handleError(err))
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
        catchError((err) =>this.handleError(err)) 

        // by writing this.handleError you loose context 'this' - so it won't work
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
        catchError((err) =>this.handleError(err))
      );
  }

  // private handleError(error: Response) { 
  //   if(error.status == 0)
  //     return throwError(new NetworkError(error));
  //   if(error.status == 404)
  //     return throwError(new NotFoundError(error));
  //   if(error.status == 401) {
  //     return throwError(new UnauthorisedError(error));
  //   }
  //   if(error.status == 504) {
  //     return throwError(new GatewayTimeoutError(error));
  //   }
  //   if(error.status == 400)
  //     return throwError(new BadInput(error));
  //   return throwError(new AppError(error));
  // }

  private handleError(error: Response) { 
    let errMsg = "Unexpected Error Occured!";

    switch(+error.status) {
      case 0:
        errMsg = "No Internet!"; break;
      case 404:
        errMsg = "URL Not Found!"; break;
      case 401:
        errMsg = "You have been logged out!";
        this.authService.logout();
        break;
      case 504:
        errMsg = "Oops! Request Timed Out."; break;
      case 400:
        errMsg = "Bad Input!"; break;
    }
    return throwError(errMsg);
  }
}
