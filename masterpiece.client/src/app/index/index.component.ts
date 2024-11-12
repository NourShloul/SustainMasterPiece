import { Component } from '@angular/core';
import { URLService } from '../URLservices/url.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrl: './index.component.css'
})
export class IndexComponent {
  servicesArray: any
  ngOnInit() {
    this.getAllServices()
  }

  constructor(private _ser: URLService) { }

  getAllServices() {
    this._ser.getAllServices().subscribe((data) => {
      this.servicesArray = data
    })
  }
}
