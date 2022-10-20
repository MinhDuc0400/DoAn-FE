import { Injectable } from '@angular/core';
import Swal, { SweetAlertOptions, SweetAlertIcon } from 'sweetalert2';
import { NbComponentStatus, NbGlobalPhysicalPosition, NbToastrService, } from '@nebular/theme';

@Injectable({
  providedIn: 'root',
})
export class SweetAlert {
  constructor(
    private toastrService: NbToastrService,
  ) {
  }

  showToast(type: NbComponentStatus, title: string, body: string) {
    const config = {
      status: type,
      destroyByClick: true,
      duration: 5000,
      hasIcon: true,
      position: NbGlobalPhysicalPosition.TOP_RIGHT,
      preventDuplicates: false,
    };
    const titleContent = title ? `${title}` : '';

    this.toastrService.show(body, `${titleContent}`, config);
  }

  close() {
    Swal.close();
  }

  alert(text: string, icon: SweetAlertIcon, options?: SweetAlertOptions) {
    return Swal.fire({
      icon: icon,
      html: text,
      confirmButtonText: 'OK',
      ...options,
    });
  }


  confirm(
    message: string,
    title?: string,
    confirmText: string = 'YES',
    options?: SweetAlertOptions,
  ): Promise<any> {
    return Swal.fire({
      title: title,
      html: message,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: confirmText,
      ...options,
    }).then(result => {
      return result.value;
    });
  }

  confirmDelete(
    itemName: string,
    title?: string,
    confirmText: string = 'Yes',
    options?: SweetAlertOptions,
  ): Promise<any> {
    return this.confirm(
       'Are you sure to delete ' + itemName,
      title,
      confirmText,
      options,
    );
  }

  confirmUpdate(
    itemName: string,
    title?: string,
    confirmText: string = 'Yes',
    options?: SweetAlertOptions,
  ): Promise<any> {
    return this.confirm(
      'Are you sure to update ' + itemName,
      title,
      confirmText,
      options,
    );
  }

  showUpdatedMessage() {
    return Swal.fire('Update successfully', '', 'success');
  }

  showDeletedMessage() {
    return Swal.fire('Delete successfully', '', 'success');
  }

  showError(text: string) {
    return Swal.fire(text, '', 'error');
  }

  showSomethingWentWrong() {
    return Swal.fire(
      'Something went wrong. Try again',
      '',
      'error',
    );
  }
}
