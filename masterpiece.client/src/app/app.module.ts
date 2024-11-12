import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';
import { IndexComponent } from './index/index.component';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { ComingsoonComponent } from './comingsoon/comingsoon.component';
import { ServicesComponent } from './services/services.component';
import { DashboardComponent } from './Admin/dashboard/dashboard.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { SuberviceComponent } from './subervice/subervice.component';
import { ServiceRequestComponent } from './service-request/service-request.component';
import { AddpostComponent } from './Blog/addpost/addpost.component';
import { PostCommentsComponent } from './Blog/post-comments/post-comments.component';
import { AllPostComponent } from './Blog/all-post/all-post.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    HomeComponent,
    IndexComponent,
    AboutComponent,
    ContactComponent,
    ComingsoonComponent,
    ServicesComponent,
    DashboardComponent,
    RegisterComponent,
    LoginComponent,
    ProfileComponent,
    EditProfileComponent,
    SuberviceComponent,
    ServiceRequestComponent,
    AddpostComponent,
    PostCommentsComponent,
    AllPostComponent
  ],
  imports: [
    BrowserModule, HttpClientModule,
    AppRoutingModule,
    FormsModule,
    RouterModule.forRoot([
      { path: '', component: IndexComponent, pathMatch: 'full' },
      { path: 'navbar', component: NavbarComponent },
      { path: 'footer', component: FooterComponent },
      { path: 'about', component: AboutComponent },
      { path: 'contact', component: ContactComponent },
      { path: 'comingsoon', component: ComingsoonComponent },
      { path: 'Register', component: RegisterComponent },
      { path: 'Login', component: LoginComponent },
      { path: 'Profile', component: ProfileComponent },
      { path: 'EditProfile/:id', component: EditProfileComponent },
      {path : "services", component : ServicesComponent},
      { path: "subServices/:id", component: SuberviceComponent },
      { path: "serviceRequest/:id", component: ServiceRequestComponent },
      //////////////Blog////////////////
      { path: "AddPost", component: AddpostComponent },
      { path: 'allposts', component: AllPostComponent },
      { path: 'postcomments/:id', component: PostCommentsComponent },





    ])



  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
