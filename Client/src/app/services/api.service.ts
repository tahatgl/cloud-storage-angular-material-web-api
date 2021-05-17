import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user';
import { Files } from '../models/files';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  apiUrl = "https://localhost:44391/api/";

constructor(private http: HttpClient) { 
}

FileList(userId: number, roleId: number) {
  return this.http.get(this.apiUrl + "user/fileListForUser?userId=" + userId + "&roleId=" + roleId);
}

Login(mail: string, password: string) {
  return this.http.get(this.apiUrl + "user/login?mail=" + mail + "&password=" + password);
}

DeleteFile(id: number) {
  return this.http.get(this.apiUrl + "file/deleteFile?id=" + id);
}

Register(user: User) {
  return this.http.post(this.apiUrl + "user/createUser", user);
}

FileUpload(file: FormData) {
  return this.http.post(this.apiUrl + "file/fileUpload", file);
}

}
