import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { error, log } from 'console';

@Injectable({
  providedIn:"root"
})
export class HttperrorInterceptorInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    console.log("HTTP ingterceptor working")
    return next.handle(request).pipe(
      catchError((error:HttpErrorResponse)=>{
        alert(`you have error=> ${error.error.error} $ status code =>${error.status}`)
        console.log();
        
       
        return throwError(error.error);
        
      })
    )
  }
}
