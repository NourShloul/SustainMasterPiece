import { Component } from '@angular/core';
import { URLService } from '../../URLservices/url.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-all-post',
  templateUrl: './all-post.component.html',
  styleUrl: './all-post.component.css'
})
export class AllPostComponent {
  userId: any;
  image: any;

  constructor(private _ser: URLService, private _router: Router) { }

  ngOnInit() {
    this.userId = localStorage.getItem("userId");
    this.getAllPosts();
  }

  dataArray: any;
  getAllPosts() {
    this._ser.GetAllPosts().subscribe((data) => {
      this.dataArray = data;
    });
  }

  shareOnX(post: any) {
    const postUrl = `https://www.islambook.com/azkar/16/%D8%AF%D8%B9%D8%A7%D8%A1-%D8%AE%D8%AA%D9%85-%D8%A7%D9%84%D9%82%D8%B1%D8%A2%D9%86-%D8%A7%D9%84%D9%83%D8%B1%D9%8A%D9%85#google_vignette`;
    const tweetText = encodeURIComponent(post.storyContent);
    const xShareUrl = `https://twitter.com/intent/tweet?text=${tweetText}&url=${encodeURIComponent(postUrl)}`;

    window.open(xShareUrl, '_blank');
  }

  data = {
    "postId": 0,
    "userId": localStorage.getItem("userId")
  };

  addLike(postId: number) {
    this.data.postId = postId;
    this._ser.addLike(this.data).subscribe(() => {
      this.getAllPosts();
    });
  }

  toggleLike(post: any) {
    post.userHasLiked = !post.userHasLiked;
    if (post.userHasLiked) {
      console.log('User liked the post');
    } else {
      console.log('User unliked the post');
    }
  }

  changeImage(event: any) {
    this.image = event.target.files[0];
  }

  // إرسال النموذج
  Addpost(formData: any) {
    const form = new FormData();

    for (let key in formData) {
      form.append(key, formData[key]);
    }

    form.append("userId", this.userId);

    if (this.image) {
      form.append("StoryPhoto", this.image);
    }

    this._ser.Addnewpost(this.userId, form).subscribe(
      () => {
        Swal.fire({
          icon: 'success',
          title: 'Post added successfully',
          text: 'Your post has been published!',
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
          title: 'Failed to add post',
          text: 'An error occurred while adding your post. Please try again.',
          confirmButtonColor: '#d33',
          confirmButtonText: 'OK'
        });

        console.error("Error:", error);
      }
    );
  }
}
