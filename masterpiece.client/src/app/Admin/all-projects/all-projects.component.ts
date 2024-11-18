import { Component } from '@angular/core';
import { URLService } from '../../URLservices/url.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-all-projects',
  templateUrl: './all-projects.component.html',
  styleUrl: './all-projects.component.css'
})
export class AllProjectsComponent {
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
    this.getAllProjects();
  }

  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;
      console.log('Selected file:', this.selectedFile); 
    }
  }
  getAllProjects() {
    this._ser.getAllProjects().subscribe((data) => {
      this.servicesArray = data;
    });
  }
  openModal(item: any) {
    this.isModalOpen = true;
    this.currentProjectId = item.projectId; 
    this.formData.name = item.projectName;
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
      formData.append('ProjectName', this.formData.name);
      formData.append('Description', this.formData.Description);
      if (!this.selectedFile) {
        console.error('No file selected');
        return;
      }
      formData.append('Image', this.selectedFile);

      this._ser.updateProject(this.currentProjectId, formData).subscribe(
        (response) => {
          Swal.fire({
            icon: 'success',
            title: 'Updated!',
            text: 'The project has been updated successfully.',
            confirmButtonText: 'OK',
          });
          this.getAllProjects(); 
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


  deleteProject(id: any) {
    Swal.fire({
      title: 'Are you sure?',
      text: 'Do you want to delete this Project? This action cannot be undone!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'Cancel'
    }).then((result) => {
      if (result.isConfirmed) {
        this._ser.deleteProject(id).subscribe(
          () => {
            Swal.fire({
              icon: 'success',
              title: 'Deleted!',
              text: 'The project has been deleted successfully.',
              confirmButtonText: 'OK'
            });
            this.getAllProjects(); 
          },
          (error) => {
            Swal.fire({
              icon: 'error',
              title: 'Error!',
              text: 'There was an error deleting the project.',
              confirmButtonText: 'OK'
            });
          }
        );
      }
    });
  }
}
