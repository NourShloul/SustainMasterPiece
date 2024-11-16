import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class URLService {
  constructor(private http: HttpClient) { }
  staticData = "https://localhost:7270/api";

  userId: BehaviorSubject<string> = new BehaviorSubject<string>("");
  UserIdmm = this.userId.asObservable();

  SignUserUp(data: any): Observable<any> {
    return this.http.post<any>(`${this.staticData}/User/Register`, data)
  }

  LoginUser(data: any): Observable<any> {
    return this.http.post<any>(`${this.staticData}/User/Login`, data)
  }

  getUser(id: number): Observable<any> {
    return this.http.get<any>(`${this.staticData}/User/getUserByID/${id}`);
  }


  updateProfile(userId: number, formData: FormData): Observable<any> {
    return this.http.put<any>(`${this.staticData}/User/EditUserProfile/${userId}`, formData);
  }

  getAllUsers(): Observable<any> {
    return this.http.get<any>(`${this.staticData}/User/getAllUser`);
  }

  ////////////////////////    Service in User + Admin//////////////////////////////
  getAllServices(): Observable<any> {
    return this.http.get<any>(`${this.staticData}/Service/Service/GetAllServices`)
  }

  CreateService(data: any): Observable<any> {
    return this.http.post<any>(`${this.staticData}/Service/Services/CreateServices`, data)
  }

  UpdateServices(id: any): Observable<any> {
    return this.http.put(`${this.staticData}/Service/Services/UpdateServices/${id}`, {})
  }

  deleteService(id: any): Observable<any> {

    return this.http.delete<any>(`${this.staticData}/Service/Services/DeleteService/${id}`)
  }
  
  getAllSubservicesByServiceId(id :any): Observable<any> {
    return this.http.get<any>(`${this.staticData}/Subservice/Subervices/GetSubserviceByServiceId/${id}`)
  }
  /////////////////////////////////////////////////////////////////////////////////////////////////

  getAllSubservices(): Observable<any> {

    return this.http.get<any>(`${this.staticData}/Subservice/Subservice/GetAllSubservices`)
  }

  CreateServiceRequest(data: any): Observable<any> {
    return this.http.post<any>(`${this.staticData}/Request/createServiceRequest`,data)
  }

  GetServiceRequest(): Observable<any> {
    return this.http.get<any>(`${this.staticData}/Request/getServiceRequest`)
  }

  GetServiceRequestByUserId(id: any): Observable<any> {
    return this.http.get<any>(`${this.staticData}/Request/getServiceRequestByUserId/${id}`)
  }

  ////////////////////////Blog//////////////////

  Addnewpost(id: any, data: any): Observable<any> {
    return this.http.post<any>(`${ this.staticData }/Blog/AddPosts/${id}`, data);
  }

  GetAllPosts(): Observable<any> {

    return this.http.get<any>(`${this.staticData}/Blog/GetAllPosts`);
  }
  GetPostDetails(postId: any): Observable<any> {
    return this.http.get<any>(`${this.staticData}/Blog/PostDetailsById/${postId}`);
  }
  GetCommentByPostId(postId: any): Observable<any> {
    return this.http.get<any>(`${this.staticData}/Blog/GetAllComment/${postId}`);
  }
  AddnewComment(postid: any, data: any): Observable<any> {
    return this.http.post<any>(`${this.staticData}/Blog/AddComment/${postid}`,data);
  }
  AddreplayoneComment(data: any): Observable<any> {
    return this.http.post<any>(`${this.staticData }/Blog/ReplayOnComment`, data);
  }
  GetAllreplaybycommentid(commentid: any): Observable<any> {
    return this.http.get<any>(`${this.staticData }/Blog/GetAllReplyByCommentId/${ commentid }`);
  }

  addLike(data: any): Observable<any> {
    return this.http.post<any>(`${this.staticData}/Blog/addLike`, data);
  }
  ////////////Admin/////////////
  UpdateTestimonial(id: any): Observable<any> {
    return this.http.put(`${this.staticData }/Blog/AcceptPostById/${ id }`, {})
  }

  deleteTestimonial(id: any): Observable<any> {

    return this.http.delete<any>(`${this.staticData}/Blog/DeletePost/${id}`)
  }

  GetAllTestimonialToAccept(): Observable<any> {
    return this.http.get<any>(`${this.staticData}/Blog/postnotaccepted`);
  }

  GetTestimonial(): Observable<any> {
    return this.http.get<any>(`${this.staticData }/Blog/GetAllAcceptedPost`);

  }
  ////////////////////Projects(Gallery)///////////////////////////

  getAllProjects(): Observable<any> {
    return this.http.get<any>(`${this.staticData}/Project/Project/GetAllProjects`)
  }


  ///////////////contact////////////////////////////////
  addContact(data: any): Observable<any> {
    return this.http.post<any>(`${this.staticData}/Contact/AddContact`, data)
  }

  getContact(): Observable<any> {
    return this.http.get<any>(`${this.staticData}/Contact/GetByDesc`);

  }

  deletContact(id: any): Observable<any> {

    return this.http.delete<any>(`${this.staticData}/Contact/DeleteContact/${id}`)
  }

  GetSheler(): Observable<any> {
    return this.http.get<any>(`${this.staticData}/Contact/latest`)
  }

}
