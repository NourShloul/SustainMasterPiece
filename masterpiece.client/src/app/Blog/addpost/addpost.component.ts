import { Component } from '@angular/core';
import { URLService } from '../../URLservices/url.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-addpost',
  templateUrl: './addpost.component.html',
  styleUrl: './addpost.component.css'
})
export class AddpostComponent {
  userId: any;
  image: any;

  constructor(private _src: URLService, private _router: Router) { }

  ngOnInit() {
    // الحصول على userId من localStorage
    this.userId = localStorage.getItem("userId");
  }

  // التعامل مع اختيار الصورة
  changeImage(event: any) {
    this.image = event.target.files[0]; // احصل على الصورة المرفوعة
  }

  // إرسال النموذج
  Addpost(formData: any) {
    debugger;
    const form = new FormData();

    // إضافة الحقول من النموذج إلى formData
    for (let key in formData) {
      form.append(key, formData[key]);
    }

    // إضافة userId إلى formData
    form.append("userId", this.userId);

    // إضافة الصورة إلى formData
    if (this.image) {
      form.append("StoryPhoto", this.image);
    }

    // استدعاء الخدمة لإرسال البيانات إلى API
    this._src.Addnewpost(this.userId, form).subscribe(
      () => {
        Swal.fire({
          icon: 'success',
          title: 'Post added successfully',
          text: 'Your Post has been Sent to Admin',
          confirmButtonColor: '#3085d6',
          confirmButtonText: 'OK'
        }).then((result) => {
          if (result.isConfirmed) {
            this._router.navigate(['/allposts']);
          }
        });
        console.log("Response:", form);
      },
      (error) => {
        Swal.fire({
          icon: 'error',
          title: 'Failed to create your post',
          text: 'An error occurred while creating your Post. Please try again.',
          confirmButtonColor: '#d33',
          confirmButtonText: 'OK'
        });

        console.error("Error:", error);
      }
    );
  }
}
