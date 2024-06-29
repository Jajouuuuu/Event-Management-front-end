import { Injectable } from '@angular/core';
import Swal, { SweetAlertOptions, SweetAlertResult } from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class SwalService {

  constructor() { }

  alert(title: string, message: string, type: SweetAlertOptions['icon'] = 'info'): Promise<SweetAlertResult<any>> {
    return Swal.fire({
      title: title,
      text: message,
      icon: type,
      confirmButtonColor: '#3085d6',
      confirmButtonText: 'OK'
    });
  }

  confirm(title: string, message: string): Promise<boolean> {
    return Swal.fire({
      title: title,
      text: message,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes',
      cancelButtonText: 'No'
    }).then((result) => {
      return result.isConfirmed;
    });
  }

  showNoResultsAlert(): void {
    Swal.fire({
      icon: 'info',
      title: 'No results found',
      text: 'No events match your search criteria.',
      confirmButtonColor: '#3085d6',
      confirmButtonText: 'OK'
    });
  }

  success(title: string, message: string): Promise<SweetAlertResult<any>> {
    return Swal.fire({
      title: title,
      text: message,
      icon: 'success',
      confirmButtonColor: '#3085d6',
      confirmButtonText: 'OK'
    });
  }

  error(title: string, message: string): Promise<SweetAlertResult<any>> {
    return Swal.fire({
      title: title,
      text: message,
      icon: 'error',
      confirmButtonColor: '#3085d6',
      confirmButtonText: 'OK'
    });
  }
}
