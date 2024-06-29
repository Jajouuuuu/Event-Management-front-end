import { Observable } from "rxjs/internal/Observable";
import { of } from "rxjs/internal/observable/of";
import { environment } from "../environment/environment";
import { SwalService } from "./swal.service";
import { Injectable } from "@angular/core";
import { throwError } from "rxjs";

@Injectable({
    providedIn: 'root'
  })
export class BaseService {

    environmentUrl = environment.apiUrl;

    constructor(private swalService: SwalService){}

    protected handleError<T>(operation = 'operation', result?: T) {
        return (error: any): Observable<T> => {
          console.error(`${operation} failed: ${error.message}`, error);
          return throwError(error);
        };
      }
    
}