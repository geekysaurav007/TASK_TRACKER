import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import {responseType} from '../datatypes/responseType'

@Injectable({
  providedIn:"root"
})
export class HttperrorInterceptorInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    console.log("HTTP ingterceptor working")
    return next.handle(request).pipe(
      catchError((error:HttpErrorResponse)=>{
        const errorMessage=this.setError(error)
        alert(`you have error=> ${errorMessage.errorMessage} $ status code =>${errorMessage.status}`)
        return throwError(error.error);
        
      })
    )
  }
  setError(error:HttpErrorResponse):responseType {
    let errorMessage={
      errorMessage:"unknown error occured",
      status:999
    }
    if(error.error instanceof ErrorEvent){
      errorMessage.errorMessage=error.statusText
    }
    
    else{
     if(error.status!==0){
      errorMessage.errorMessage=error.error.error
      errorMessage.status=error.status
     }
     else{
      errorMessage.errorMessage=error.statusText
      errorMessage.status=error.status
     }
    }
   
    return errorMessage
  }

}
