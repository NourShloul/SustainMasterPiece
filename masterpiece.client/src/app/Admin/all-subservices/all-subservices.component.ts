import { Component } from '@angular/core';
import { URLService } from '../../URLservices/url.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-all-subservices',
  templateUrl: './all-subservices.component.html',
  styleUrl: './all-subservices.component.css'
})
export class AllSubservicesComponent {
  servicesArray: any
  ngOnInit() {
    this.getAllSubservices()
  }

  constructor(private _ser: URLService) { }

  getAllSubservices() {
    this._ser.getAllSubservices().subscribe((data) => {
      this.servicesArray = data
    })
  }

  deleteSubservice(id: any) {
    // عرض نافذة التأكيد
    Swal.fire({
      title: 'Are you sure?',
      text: 'Do you want to delete this subservice? This action cannot be undone!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'Cancel'
    }).then((result) => {
      if (result.isConfirmed) {
        // تنفيذ عملية الحذف إذا تم التأكيد
        this._ser.deleteSubservice(id).subscribe(() => {
          Swal.fire({
            icon: 'success',
            title: 'Deleted!',
            text: 'The subservice has been deleted successfully.',
            confirmButtonText: 'OK'
          });
          this.getAllSubservices();
        },
          (error) => {
            Swal.fire({
              icon: 'error',
              title: 'Error!',
              text: 'There was an error deleting the subservice.',
              confirmButtonText: 'OK'
            });
          });
      }
    });
  }
}
