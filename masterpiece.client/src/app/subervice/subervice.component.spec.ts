import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuberviceComponent } from './subervice.component';

describe('SuberviceComponent', () => {
  let component: SuberviceComponent;
  let fixture: ComponentFixture<SuberviceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SuberviceComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SuberviceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
