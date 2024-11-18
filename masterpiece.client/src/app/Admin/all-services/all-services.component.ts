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
  servicesArray: any = [];
  isModalOpen = false;
  selectedFile: File | null = null;
  formData = {
    name: '',
    Description: '',
  };
  currentServiceId: number | null = null; 
  ngOnInit() {
    this.getAllServices()
  }

  constructor(private _ser: URLService) { }
  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;
      console.log('Selected file:', this.selectedFile);
    }
  }
  getAllServices() {
    this._ser.getAllServices().subscribe((data) => {
      this.servicesArray = data
    })
  }

  openModal(item: any) {
    this.isModalOpen = true;
    this.currentServiceId = item.projectId;
    this.formData.name = item.projectName;
    this.formData.Description = item.description;
  }


  closeModal() {
    this.isModalOpen = false;
    this.currentServiceId = null;
    this.formData = { name: '', Description: '' };
  }


  onSubmit() {
    if (this.currentServiceId !== null) {
      const formData = new FormData();
      formData.append('ProjectName', this.formData.name);
      formData.append('Description', this.formData.Description);
      if (!this.selectedFile) {
        console.error('No file selected');
        return;
      }
      formData.append('Image', this.selectedFile);

      this._ser.UpdateServices(this.currentServiceId).subscribe(
        (response) => {
          Swal.fire({
            icon: 'success',
            title: 'Updated!',
            text: 'The project has been updated successfully.',
            confirmButtonText: 'OK',
          });
          this.getAllServices();
          this.closeModal();
        },
        (error) => {
          Swal.fire({
            icon: 'error',
            title: 'Error!',
            text: 'There was an error updating the project.',
            confirmButtonText: 'OK',
          });
        }
      );
    }
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
