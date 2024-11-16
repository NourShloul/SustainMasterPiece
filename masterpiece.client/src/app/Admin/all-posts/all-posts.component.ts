import { Component } from '@angular/core';
import { URLService } from '../../URLservices/url.service';

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

}
