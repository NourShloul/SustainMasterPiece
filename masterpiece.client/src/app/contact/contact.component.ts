import { Component } from '@angular/core';
import { URLService } from '../URLservices/url.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css'
})
export class ContactComponent {
  ngOnInit() {

  }
  constructor(private _ser: URLService) {

  }

  AddNewMessage(data: any) {
    var form = new FormData();
    for (let key in data) {
      form.append(key, data[key])
    }

    this._ser.addContact(form).subscribe(() => {
      Swal.fire({
        icon: 'success',
        title: 'Message Sent',
        text: 'The message has been sent successfully!'
      });
    },
      (error) => {
        if (error.status === 400) {
          Swal.fire({
            icon: 'error',
            title: 'Data Error',
            text: 'There was an error in the data you submitted. Please check your inputs.'
          });
        } else if (error.status === 500) {
          Swal.fire({
            icon: 'error',
            title: 'Server Error',
            text: 'An internal server error occurred. Please try again later.'
          });
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Unexpected Error',
            text: `An unexpected error occurred: ${error.message}`
          });
        }
      }
    );
  }
}
