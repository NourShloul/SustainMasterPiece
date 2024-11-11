import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import Swal from 'sweetalert2';
import { URLService } from '../URLservices/url.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrl: './edit-profile.component.css'
})
export class EditProfileComponent implements OnInit {
  
  imagePreview: string | ArrayBuffer | null = null;
  selectedFile: File | null = null;
  userId: any
  userData: any;

  constructor(private _ser: URLService , private _active : ActivatedRoute) { }

  ngOnInit(): void {
    this.userId = this._active.snapshot.paramMap.get('id')
    this.userId = Number(localStorage.getItem("userId"));
    this.getUser();
  }
  image :any
  onFileSelected(event :any): void {
    debugger
    const fileInput = event.target as HTMLInputElement;
    if (fileInput.files && fileInput.files[0]) {
      const file = fileInput.files[0];
      this.selectedFile = file;
      debugger
      this.image = event.target.files[0]
      const reader = new FileReader();
      reader.onload = (e) => {
        this.imagePreview = reader.result;
      };
      reader.readAsDataURL(file);
    }
  }



  getUser() {
    this._ser.getUser(this.userId).subscribe((data) => {
      this.userData = data;
      console.log("userData", data);
    });
  }

  OnSubmit(data: any) {

    var form = new FormData();
    for (let key in data) {
      form.append(key, data[key]);
    }


    form.append("Email", this.userData.email)
    form.append("Image", this.image)
    this._ser.updateProfile(this.userId, form).subscribe(
      response => {
        console.log('Profile updated successfully:', response);
        Swal.fire({
          icon: 'success',
          title: 'Profile Updated',
          text: 'Profile updated successfully'
        });

      },
      (error: HttpErrorResponse) => {
        console.error('Error updating profile:', error.message);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Failed to update profile: ' + (error.error.message || 'An error occurred.')
        });
      }
    );
  }
}
