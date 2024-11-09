import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class URLService {
  constructor(private http: HttpClient) { }
  staticData = "https://localhost:7270/api";


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
}
