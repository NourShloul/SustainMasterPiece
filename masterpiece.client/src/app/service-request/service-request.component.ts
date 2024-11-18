import { Component } from '@angular/core';
import { URLService } from '../URLservices/url.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-service-request',
  templateUrl: './service-request.component.html',
  styleUrls: ['./service-request.component.css']
})
export class ServiceRequestComponent {
  userId: any;
  userData: any;
  subservices: any;
  selectedSubserviceIds: any[] = []; // Initialize as an empty array

  constructor(private _ser: URLService, private _router: Router) { }

  ngOnInit() {
    this.userId = Number(localStorage.getItem("userId"));
    this.getUser();
    this.getAllSubservices();
  }

  getUser() {
    this._ser.getUser(this.userId).subscribe((data) => {
      this.userData = data;
      console.log("userData", data);
    });
  }

  getAllSubservices() {
    this._ser.getAllSubservices().subscribe((data) => {
      this.subservices = data;
    });
  }

  onRequestClick(data: any) {
    var form = new FormData();
    for (let key in data) {
      form.append(key, data[key]);
    }
    this.selectedSubserviceIds.forEach((id: any) => form.append("SubserviceId[]", id.toString()));
    form.append("UserId", this.userId);

    this._ser.CreateServiceRequest(form).subscribe(() => {
      Swal.fire({
        icon: 'success',
        title: 'Form submitted successfully',
        text: 'Your Request has been Sent',
        confirmButtonColor: '#3085d6',
        confirmButtonText: 'OK'
      }).then((result) => {
        if (result.isConfirmed) {
          this._router.navigate(['/services']);
        }
      });

      console.log("Response:", form);
    },
      (error) => {
        Swal.fire({
          icon: 'error',
          title: 'Failed to submit your request',
          text: 'An error occurred while submitting your Request. Please try again.',
          confirmButtonColor: '#d33',
          confirmButtonText: 'OK'
        });

        console.error("Error:", error);
      }
    );
  
}

  onSubserviceClick(event: any, subserviceId: number) {
    if (event.target.checked) {
      // Add to selectedSubserviceIds if checked
      this.selectedSubserviceIds.push(subserviceId);
    } else {
      // Remove from selectedSubserviceIds if unchecked
      this.selectedSubserviceIds = this.selectedSubserviceIds.filter((id: any) => id !== subserviceId);
    }
  }
}
