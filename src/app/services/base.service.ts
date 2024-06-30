import { Observable } from "rxjs/internal/Observable";
import { of } from "rxjs/internal/observable/of";
import { environment } from "../environment/environment";
import { SwalService } from "./swal.service";
import { Injectable } from "@angular/core";
import { throwError } from "rxjs";

/**
 * Base service class providing common functionalities and error handling.
 */
@Injectable({
  providedIn: 'root'
})
export class BaseService {

  /** Base URL from environment configuration */
  environmentUrl = environment.apiUrl;

  constructor(private swalService: SwalService) { }

  /**
   * Handles HTTP errors.
   * @param operation - Name of the operation that failed
   * @param result - Optional value to return as the observable result
   * @returns An observable with a user-facing error message and emits the error to be handled
   */
  protected handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(`${operation} failed: ${error.message}`, error);
      return throwError(error);
    };
  }

}
