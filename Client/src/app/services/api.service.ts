import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../models/user';
import { Files } from '../models/files';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  //apiUrl = "https://localhost:44391/api/";
  apiUrl = "http://localhost:8091/api/";

constructor(private http: HttpClient) { 
}

Token(mail: string, password: string) {
  var data = "username=" + mail + "&password=" + password + "&grant_type=password";
  var request = new HttpHeaders({ "Content-Type" : "application/x-www-form-urlencoded" });
  return this.http.post(this.apiUrl + "token", data, { headers: request });
}

FileList(userId: number, roleId: number) {
  return this.http.get(this.apiUrl + "user/fileListForUser/" + userId + "/" + roleId);
}

UserList(roleId: number) {
  return this.http.get(this.apiUrl + "user/userList?roleId=" + roleId);
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

UpdateUser(user: User) {
  return this.http.put(this.apiUrl + "user/updateUser", user);
}

}
