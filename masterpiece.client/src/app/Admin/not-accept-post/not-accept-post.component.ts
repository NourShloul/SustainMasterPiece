import { Component } from '@angular/core';
import { URLService } from '../../URLservices/url.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-not-accept-post',
  templateUrl: './not-accept-post.component.html',
  styleUrl: './not-accept-post.component.css'
})
export class NotAcceptPostComponent {
  TestimonialArray: any;

  constructor(private _ser: URLService) { }

  ngOnInit() {
    this.GetAllTestimonial();
  }

  GetAllTestimonial() {
    this._ser.GetAllTestimonialToAccept().subscribe((data) => {
      this.TestimonialArray = data;
      console.log(this.TestimonialArray, "this.TestimonialArray");
    });
  }

  deleteContactById(id: any) {
    Swal.fire({
      title: 'Are you sure?',
      text: "This action cannot be undone.",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this._ser.deletePost(id).subscribe(() => {
          Swal.fire({
            icon: 'success',
            title: 'Deleted!',
            text: 'This message has been deleted successfully.',
            confirmButtonColor: '#3085d6',
          });
          this.GetAllTestimonial();
        });
      }
    });
  }

  AcceptTheTestimonial(id: any) {
    this._ser.UpdateTestimonial(id).subscribe(() => {
      Swal.fire({
        icon: 'success',
        title: 'Accepted!',
        text: 'This message has been accepted successfully.',
        confirmButtonColor: '#3085d6',
      });
      this.GetAllTestimonial();
    });
  }
}
