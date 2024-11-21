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

  ////////////////////////    Service in User + Admin   //////////////////////////////
  getAllServices(): Observable<any> {
    return this.http.get<any>(`${this.staticData}/Service/Service/GetAllServices`)
  }

  CreateService(data: any): Observable<any> {
    return this.http.post<any>(`${this.staticData}/Service/Services/CreateService`, data)
  }

  UpdateServices(id: any, formData: FormData): Observable<any> {
    return this.http.put(`${this.staticData}/Service/Services/UpdateService/${id}`, formData)
  }

  deleteService(id: any): Observable<any> {

    return this.http.delete<any>(`${this.staticData}/Service/Services/DeleteService/${id}`)
  }
  
  getAllSubservicesByServiceId(id :any): Observable<any> {
    return this.http.get<any>(`${this.staticData}/Subservice/Subervices/GetSubserviceByServiceId/${id}`)
  }
  /////////////////////////////////////////////////////////////////////////////////////////////////
  ////////////////////////     Subservice in User + Admin   /////////////////////////////////
  getAllSubservices(): Observable<any> {

    return this.http.get<any>(`${this.staticData}/Subservice/Subservice/GetAllSubservices`)
  }

  CreateSubservice(data: any): Observable<any> {
    return this.http.post<any>(`${this.staticData}/Subservice/Subservices/CreateSubservice`, data)
  }

  UpdateSubservices(id: any, formData: FormData): Observable<any> {
    return this.http.put(`${this.staticData}/Subservice/Subservices/UpdateSubservice/${id}`, formData)
  }

  deleteSubservice(id: any): Observable<any> {

    return this.http.delete<any>(`${this.staticData}/Subservice/Subservices/DeleteSubservice/${id}`)
  }
  ///////////////////////////////////////////////////////////////////////////////////////////////
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

  deletePost(id: any): Observable<any> {

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

  deleteProject(id: any): Observable<any> {

    return this.http.delete<any>(`${this.staticData}/Project/Project/DeleteProject/${id}`)
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

  ////////////////////////////////////admin login/////////////
  LoginAdmin(data: any): Observable<any> {
    return this.http.post<any>(`${this.staticData}/User/LoginAdmin`, data)
  }
  updateProject(id: any, formData: FormData): Observable<any> {
    return this.http.put<any>(`${this.staticData}/Project/Project/UpdateProject/${id}`, formData);
  }
  addProject(form: FormData): Observable<any> {
    return this.http.post(`${this.staticData}/Project/Project/CreateProject`,form)
  }


  ////////////////////////Status///////////////////
  UpdateStatus(id: any, status: string): Observable<any> {
    const body = { Status: status }; // إرسال الحالة الجديدة
    return this.http.put(`${this.staticData}/Request/editorder/${id}`, body);
  }
}
