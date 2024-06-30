import { Injectable } from '@angular/core';
import Swal, { SweetAlertOptions, SweetAlertResult } from 'sweetalert2';

/**
 * Service for integrating SweetAlert2 library into Angular applications.
 * Provides methods to display various types of alerts and confirmation dialogs.
 */
@Injectable({
  providedIn: 'root'
})
export class SwalService {

  constructor() { }

  /**
   * Displays a simple alert dialog.
   * @param title The title of the alert
   * @param message The message content of the alert
   * @param type The type of icon to display (default is 'info')
   * @returns A Promise resolving to the result of the alert dialog
   */
  alert(title: string, message: string, type: SweetAlertOptions['icon'] = 'info'): Promise<SweetAlertResult<any>> {
    return Swal.fire({
      title: title,
      text: message,
      icon: type,
      confirmButtonColor: '#3085d6',
      confirmButtonText: 'OK'
    });
  }

  /**
   * Displays a confirmation dialog.
   * @param title The title of the confirmation dialog
   * @param message The message content of the confirmation dialog
   * @returns A Promise resolving to true if confirmed, false otherwise
   */
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

  /**
   * Displays an alert indicating no results found.
   */
  showNoResultsAlert(): void {
    Swal.fire({
      icon: 'info',
      title: 'No results found',
      text: 'No events match your search criteria.',
      confirmButtonColor: '#3085d6',
      confirmButtonText: 'OK'
    });
  }

  /**
   * Displays a success alert dialog.
   * @param title The title of the success alert
   * @param message The message content of the success alert
   * @returns A Promise resolving to the result of the success alert dialog
   */
  success(title: string, message: string): Promise<SweetAlertResult<any>> {
    return Swal.fire({
      title: title,
      text: message,
      icon: 'success',
      confirmButtonColor: '#3085d6',
      confirmButtonText: 'OK'
    });
  }

  /**
   * Displays an error alert dialog.
   * @param title The title of the error alert
   * @param message The message content of the error alert
   * @returns A Promise resolving to the result of the error alert dialog
   */
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
