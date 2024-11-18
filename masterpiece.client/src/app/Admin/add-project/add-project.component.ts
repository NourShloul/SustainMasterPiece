import { Component } from '@angular/core';
import { URLService } from '../../URLservices/url.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-project',
  templateUrl: './add-project.component.html',
  styleUrl: './add-project.component.css'
})
export class AddProjectComponent {
  ngOnInit() { }

  constructor(private _ser: URLService) { }

  image: any
  changeImage(event: any) {

    this.image = event.target.files[0];
  }

  addnewSubservice(data: any) {

    var form = new FormData();

    for (let key in data) {
      form.append(key, data[key]);
    }

    form.append("Image", this.image);

    this._ser.addProject(form).subscribe(() => {
      Swal.fire({
        icon: 'success',
        title: 'Gym Added Successfully!',
        text: 'The gym has been added successfully.',
        confirmButtonText: 'OK'
      });
    },
      (error) => {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: error.error || 'Something went wrong. Please try again.',
          confirmButtonText: 'Try Again'
        });
      });
  }
}
