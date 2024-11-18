import { Component } from '@angular/core';
import { URLService } from '../../URLservices/url.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-service',
  templateUrl: './add-service.component.html',
  styleUrl: './add-service.component.css'
})
export class AddServiceComponent {
  ngOnInit() { }

  constructor(private _ser: URLService) { }

  image: any
  changeImage(event: any) {

    this.image = event.target.files[0];
  }

  addnewService(data: any) {

    var form = new FormData();

    for (let key in data) {
      form.append(key, data[key]);
    }

    form.append("gymImage", this.image);

    this._ser.CreateService(form).subscribe(() => {
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
