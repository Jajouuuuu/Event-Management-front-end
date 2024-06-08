import { Observable } from "rxjs/internal/Observable";
import { of } from "rxjs/internal/observable/of";
import { environment } from "../environment/environment";

export class BaseService {

    environmentUrl = environment.apiUrl;

    protected handleError<T>(operation = 'operation', result?: T) {
        return (error: any): Observable<T> => {
            console.error(`${operation} failed: ${error.message}`, error); // log to console
            // Let the app keep running by returning an empty result.
            return of(result as T);
        };
    }

}