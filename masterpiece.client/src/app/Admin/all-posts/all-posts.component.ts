import { Component } from '@angular/core';
import { URLService } from '../../URLservices/url.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-all-posts',
  templateUrl: './all-posts.component.html',
  styleUrl: './all-posts.component.css'
})
export class AllPostsComponent {
  servicesArray: any
  ngOnInit() {
    this.GetAllPosts()
  }

  constructor(private _ser: URLService) { }

  GetAllPosts() {
    this._ser.GetAllPosts().subscribe((data) => {
      this.servicesArray = data
    })
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
            confirmButtonColor: '#3085d6'
          });
          this.GetAllPosts();
        });
      }
    });
  }
}
