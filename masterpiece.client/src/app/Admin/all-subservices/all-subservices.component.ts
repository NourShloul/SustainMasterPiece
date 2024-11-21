import { Component } from '@angular/core';
import { URLService } from '../../URLservices/url.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-all-subservices',
  templateUrl: './all-subservices.component.html',
  styleUrl: './all-subservices.component.css'
})
export class AllSubservicesComponent {
  servicesArray: any = [];
  isModalOpen = false;
  selectedFile: File | null = null;
  formData = {
    name: '',
    Description: '',
  };
  currentProjectId: number | null = null;

  constructor(private _ser: URLService) { }

  ngOnInit() {
    this.getAllSubservices();
  }

  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;
      console.log('Selected file:', this.selectedFile);
    }
  }
  getAllSubservices() {
    this._ser.getAllSubservices().subscribe((data) => {
      this.servicesArray = data;
    });
  }
  openModal(item: any) {
    this.isModalOpen = true;
    this.currentProjectId = item.subserviceId;
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
      console.log(formData.get("ProjectName"))
      console.log(formData.get("Description"))
      if (!this.selectedFile) {
        console.error('No file selected');
        return;
      }
      formData.append('Image', this.selectedFile);

      this._ser.UpdateSubservices(this.currentProjectId, formData).subscribe(
        (response) => {
          Swal.fire({
            icon: 'success',
            title: 'Updated!',
            text: 'The project has been updated successfully.',
            confirmButtonText: 'OK',
          });
          this.getAllSubservices();
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
