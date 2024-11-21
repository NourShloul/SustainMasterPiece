import { Component } from '@angular/core';
import { BehaviorSubjectService } from '../../BehaviorSubject/behavior-subject.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { URLService } from '../../URLservices/url.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  private openedDropdowns: Set<string> = new Set();
  isLoggedIn: boolean = false;

  constructor(private behaviorSubjectService: BehaviorSubjectService, private _router: Router , private _url : URLService) { }

  toggleDropdown(menuId: string) {
    if (this.openedDropdowns.has(menuId)) {
      this.openedDropdowns.delete(menuId);
    } else {
      this.openedDropdowns.clear();
      this.openedDropdowns.add(menuId);
    }
  }

  isDropdownOpen(menuId: string): boolean {
    return this.openedDropdowns.has(menuId);
  }

  adminEmnail:any
  ngOnInit() {
    this.adminEmnail = localStorage.getItem("AdminEmail");
    //if (this.adminEmnail != null || this.adminEmnail != undefined) {
    //console.log("batool", this.adminEmnail)
    //  window.location.reload();
    //  return

    //}
    this._url.UserIdmm.subscribe((userId  :any)=> {
   //   this.isLoggedIn = !!userId;
      console.log(userId," this.isLoggedIn")
      if (userId == this.adminEmnail) {
        this._router.navigate(['/dashboard/AllService']);
        window.location.reload()
      }
    });
  }

  logout() {
    this.behaviorSubjectService.setUserId('');
    localStorage.removeItem("AdminEmail");
    Swal.fire({
      icon: 'success',
      title: 'Logged Out',
      text: 'Logged out successfully.',
      confirmButtonText: 'OK'
    });
    this._router.navigate(['/admin']);
  }


}
