import { Component } from '@angular/core';
import { URLService } from '../URLservices/url.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-subervice',
  templateUrl: './subervice.component.html',
  styleUrl: './subervice.component.css'
})
export class SuberviceComponent {
  servicesArray: any
  serviceId: any;
  ngOnInit() {
    this.serviceId = this._active.snapshot.paramMap.get('id')
    this.getAllSubservicesByServiceId()
  }

  constructor(private _ser: URLService , private _active : ActivatedRoute) { }

  getAllSubservicesByServiceId() {
    this._ser.getAllSubservicesByServiceId(this.serviceId).subscribe((data) => {
      this.servicesArray = data
    })
  }
}
