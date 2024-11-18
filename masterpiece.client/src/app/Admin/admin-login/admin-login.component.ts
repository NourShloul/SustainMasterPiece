import { Component } from '@angular/core';
import { URLService } from '../../URLservices/url.service';
import { Router } from '@angular/router';
import { BehaviorSubjectService } from '../../BehaviorSubject/behavior-subject.service';
import Swal from 'sweetalert2'; // Import SweetAlert

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrl: './admin-login.component.css'
})
export class AdminLoginComponent {
  constructor(
    private _ser: URLService,
    private _router: Router,
    private behaviorSubjectService: BehaviorSubjectService
  ) { }

  ngOnInit() { }

  Login(data: any) {
    debugger;
    const form = new FormData();
    for (let key in data) {
      form.append(key, data[key]);
    }

    console.log("Login Data:", data);

    this._ser.LoginAdmin(form).subscribe(
      (response) => {
        console.log("Response from LoginUser:", response);
        if (response.userId) {
          this.behaviorSubjectService.setUserId(response.userId);
          // localStorage.setItem('userId', response.userId); 
          Swal.fire({ // SweetAlert for success notification
            icon: 'success',
            title: 'Success',
            text: 'User Logged In Successfully'
          });
          this._router.navigate(['/adminDashboard/AllUsers']);
        } else {
          console.warn("User ID not found in response.");
          Swal.fire({ // SweetAlert for warning notification
            icon: 'warning',
            title: 'Warning',
            text: 'User ID not found in response.'
          });
        }
      },
      (error) => {
        console.error("Login Error:", error);
        Swal.fire({ // SweetAlert for error notification
          icon: 'error',
          title: 'Login Failed',
          text: 'Login failed: ' + (error.error.message || 'An error occurred.')
        });
      }
    );
  }
}