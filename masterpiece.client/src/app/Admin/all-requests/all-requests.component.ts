// all-requests.component.ts
import { Component } from '@angular/core';
import { URLService } from '../../URLservices/url.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-all-requests',
  templateUrl: './all-requests.component.html',
  styleUrls: ['./all-requests.component.css']
})
export class AllRequestsComponent {
  servicesArray: any[] = []; // مصفوفة الطلبات الأصلية
  filteredRequests: any[] = []; // المصفوفة المفلترة بناءً على البحث
  searchTerm: string = ''; // مصطلح البحث من حقل الإدخال

  constructor(private _ser: URLService) { }

  ngOnInit() {
    this.getAllRequest();
  }

  getAllRequest() {
    this._ser.GetServiceRequest().subscribe((data) => {
      this.servicesArray = data;
      this.filteredRequests = data; // تعيين البيانات في البداية لكل الطلبات
    });
  }

  filterByCompany() {
    if (this.searchTerm) {
      this.filteredRequests = this.servicesArray.filter(item =>
        item.companyName.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    } else {
      this.filteredRequests = this.servicesArray; // إذا كانت خانة البحث فارغة، نعرض كل الطلبات
    }
  }

  updateStatus(id: any, status: string): void {
    this._ser.UpdateStatus(id, status).subscribe(
      response => {
        // عرض SweetAlert عند النجاح
        Swal.fire({
          icon: 'success',
          title: 'Status Updated Successfully!',
          text: 'The status has been changed to ' + status,
        });
      },
      error => {
        // عرض SweetAlert عند الفشل
        Swal.fire({
          icon: 'error',
          title: 'Failed to Update Status!',
          text: 'An error occurred while updating the status. Please try again.',
        });
      }
    );
  }
}
