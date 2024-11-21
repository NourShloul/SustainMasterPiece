import { Component, OnInit } from '@angular/core';
import { URLService } from '../URLservices/url.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  logedINuser = "";
  userId: any;

  constructor(private router: Router, private URLService: URLService) { }

  AdminEmail :any
  ngOnInit(): void {
    // Check if there is a logged-in user ID on initial load
    this.userId = localStorage.getItem("userId");
    this.AdminEmail = localStorage.getItem("AdminEmail")

    // Alternatively, subscribe to UserId updates if you're using an observable
    //this.URLService.UserIdmm.subscribe(user => {
    //  this.userId = user;
    //});
  }

  logout(): void {
    this.logedINuser = "";
    this.userId = null;
    localStorage.removeItem("userId");
    localStorage.removeItem("AdminEmail");
    this.router.navigate(['/']); // Navigate to home page
    window.location.reload(); // Reload to update UI
  }
}
