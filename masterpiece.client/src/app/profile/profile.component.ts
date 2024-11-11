import { Component, OnInit } from '@angular/core';
import { BehaviorSubjectService } from '../BehaviorSubject/behavior-subject.service';
import jsPDF from 'jspdf';
import { HttpErrorResponse } from '@angular/common/http';
import { URLService } from '../URLservices/url.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit {
  user: any = { image: '' };
  adoptionData: any[] = [];

  constructor(private _ser: URLService, private behaviorSubjectService: BehaviorSubjectService) { }

  ngOnInit() {
    const userId = localStorage.getItem("userId")
    if (userId) {
      this.ShowUserDetails(Number(userId));
      /*this.getAdoption(Number(userId));*/
    } else {
      console.error("User ID not found.");
    }
  }

  ShowUserDetails(userId: number): void {
    this._ser.getUser(userId).subscribe(
      (data) => {
        console.log('API Response:', data);
        this.user = data;

        if (this.user.image) {
          this.user.image = `https://localhost:7270/${this.user.image}`;
        }
      },
      (error) => {
        console.error("Error fetching user details:", error);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: "Failed to fetch user details: " + (error.error.message || "An error occurred.")
        });
      }
    );
  }

  handleUserUpdate(updatedUser: any) {
    this.user = { ...this.user, ...updatedUser };
    Swal.fire({
      icon: 'success',
      title: 'Profile Updated',
      text: 'Your profile has been updated successfully.'
    });
  }


}
