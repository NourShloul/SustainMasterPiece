import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSubserviceComponent } from './add-subservice.component';

describe('AddSubserviceComponent', () => {
  let component: AddSubserviceComponent;
  let fixture: ComponentFixture<AddSubserviceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddSubserviceComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddSubserviceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
