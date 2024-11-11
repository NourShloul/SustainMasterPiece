import { Component } from '@angular/core';
import { URLService } from '../URLservices/url.service';

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrl: './services.component.css'
})
export class ServicesComponent {
  servicesArray :any
  ngOnInit() {
    this.getAllServices()
  }

  constructor(private _ser : URLService) { }

  getAllServices() {
    this._ser.getAllServices().subscribe((data) => {
      this.servicesArray = data
    })
  }


}
