import { Component } from '@angular/core';
import { URLService } from '../URLservices/url.service';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrl: './project.component.css'
})
export class ProjectComponent {
  servicesArray: any
  ngOnInit() {
    this.getAllProjects()
  }

  constructor(private _ser: URLService) { }

  getAllProjects() {
    this._ser.getAllProjects().subscribe((data) => {
      this.servicesArray = data
    })
  }
}
