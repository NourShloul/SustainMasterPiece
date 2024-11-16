import { Component } from '@angular/core';
import { URLService } from '../../URLservices/url.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-all-projects',
  templateUrl: './all-projects.component.html',
  styleUrl: './all-projects.component.css'
})
export class AllProjectsComponent {
  servicesArray: any
  ngOnInit() {
    this.getAllProjects()
  }

  constructor(private _ser: URLService) { }

  getAllProjects() {
    this._ser.getAllProjects().subscribe((data) => {
      this.servicesArray = data
    })
  }

  deleteProject(id: any) {
    // عرض نافذة التأكيد
    Swal.fire({
      title: 'Are you sure?',
      text: 'Do you want to delete this Project? This action cannot be undone!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'Cancel'
    }).then((result) => {
      if (result.isConfirmed) {
        // تنفيذ عملية الحذف إذا تم التأكيد
        this._ser.deleteProject(id).subscribe(() => {
          Swal.fire({
            icon: 'success',
            title: 'Deleted!',
            text: 'The project has been deleted successfully.',
            confirmButtonText: 'OK'
          });
          this.getAllProjects();  // تحديث قائمة الصالات بعد الحذف
        },
          (error) => {
            Swal.fire({
              icon: 'error',
              title: 'Error!',
              text: 'There was an error deleting the project.',
              confirmButtonText: 'OK'
            });
          });
      }
    });
  }
}
