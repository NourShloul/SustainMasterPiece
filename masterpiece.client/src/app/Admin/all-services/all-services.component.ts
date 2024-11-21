import { Component } from '@angular/core';
import { URLService } from '../../URLservices/url.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-all-services',
  templateUrl: './all-services.component.html',
  styleUrls: ['./all-services.component.css']
})
export class AllServicesComponent {
  servicesArray: any = [];
  filteredServices: any = [];
  searchTerm: string = ''; // لتخزين نص البحث
  isModalOpen = false;
  selectedFile: File | null = null;
  formData = {
    name: '',
    Description: '',
  };
  currentProjectId: number | null = null;

  constructor(private _ser: URLService) { }

  ngOnInit() {
    this.getAllServices();
  }

  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;
      console.log('Selected file:', this.selectedFile);
    }
  }

  getAllServices() {
    this._ser.getAllServices().subscribe((data) => {
      this.servicesArray = data;
      this.filteredServices = data; // تعيين البيانات الأصلية للفلترة
    });
  }

  // تصفية الخدمات بناءً على النص المدخل
  filterServices() {
    if (this.searchTerm) {
      this.filteredServices = this.servicesArray.filter((service: any) =>
        service.name.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    } else {
      this.filteredServices = this.servicesArray;
    }
  }

  openModal(item: any) {
    this.isModalOpen = true;
    this.currentProjectId = item.serviceId;
    this.formData.name = item.name;
    this.formData.Description = item.description;
  }

  closeModal() {
    this.isModalOpen = false;
    this.currentProjectId = null;
    this.formData = { name: '', Description: '' };
  }

  onSubmit() {
    if (this.currentProjectId !== null) {
      const formData = new FormData();
      formData.append('Name', this.formData.name);
      formData.append('Description', this.formData.Description);
      if (!this.selectedFile) {
        console.error('No file selected');
        return;
      }
      formData.append('Image', this.selectedFile);

      this._ser.UpdateServices(this.currentProjectId, formData).subscribe(
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
    Swal.fire({
      title: 'Are you sure?',
      text: 'Do you want to delete this service? This action cannot be undone!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'Cancel'
    }).then((result) => {
      if (result.isConfirmed) {
        this._ser.deleteService(id).subscribe(() => {
          Swal.fire({
            icon: 'success',
            title: 'Deleted!',
            text: 'The service has been deleted successfully.',
            confirmButtonText: 'OK'
          });
          this.getAllServices();
        }, (error) => {
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
