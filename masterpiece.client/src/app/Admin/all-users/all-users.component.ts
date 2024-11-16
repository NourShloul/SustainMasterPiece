import { Component } from '@angular/core';
import { URLService } from '../../URLservices/url.service';

@Component({
  selector: 'app-all-users',
  templateUrl: './all-users.component.html',
  styleUrl: './all-users.component.css'
})
export class AllUsersComponent {
  ngOnInit() {

    this.getAllUsers();
  }
  constructor(private _ser: URLService) {


  }

  searchTerm: string = '';

  allusers: any

  getAllUsers() {
    this._ser.getAllUsers().subscribe((data) => {
      this.allusers = data
      console.log(this.allusers, "this.servicesArray")
    })

  }
}
