import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotAcceptPostComponent } from './not-accept-post.component';

describe('NotAcceptPostComponent', () => {
  let component: NotAcceptPostComponent;
  let fixture: ComponentFixture<NotAcceptPostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NotAcceptPostComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NotAcceptPostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
