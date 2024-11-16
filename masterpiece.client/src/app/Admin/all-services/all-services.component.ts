import { Component } from '@angular/core';
import { URLService } from '../../URLservices/url.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-all-services',
  templateUrl: './all-services.component.html',
  styleUrl: './all-services.component.css'
})
export class AllServicesComponent {
  servicesArray: any
  ngOnInit() {
    this.getAllServices()
  }

  constructor(private _ser: URLService) { }

  getAllServices() {
    this._ser.getAllServices().subscribe((data) => {
      this.servicesArray = data
    })
  }

  deleteService(id: any) {
    // عرض نافذة التأكيد
    Swal.fire({
      title: 'Are you sure?',
      text: 'Do you want to delete this service? This action cannot be undone!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'Cancel'
    }).then((result) => {
      if (result.isConfirmed) {
        // تنفيذ عملية الحذف إذا تم التأكيد
        this._ser.deleteService(id).subscribe(() => {
          Swal.fire({
            icon: 'success',
            title: 'Deleted!',
            text: 'The service has been deleted successfully.',
            confirmButtonText: 'OK'
          });
          this.getAllServices();  // تحديث قائمة الصالات بعد الحذف
        },
          (error) => {
            Swal.fire({
              icon: 'error',
              title: 'Error!',
              text: 'There was an error deleting the service.',
              confirmButtonText: 'OK'
            });
          });
      }
    });
  }
}
