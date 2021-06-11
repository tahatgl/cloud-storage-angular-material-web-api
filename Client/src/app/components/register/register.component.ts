import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/models/user';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  User: User = new User();
  Roles: any = ['Admin', 'Normal'];

  constructor(private apiService: ApiService, private route: Router, private toastr: ToastrService) { }

  ngOnInit() {
  }

  asdas(username: string, mail: string, password: string, role: string) {
    this.User.Name = username;
    this.User.Mail = mail;
    this.User.Password = password;
    if(role == "Admin") {
      this.User.Role = 1;
    }else {
      this.User.Role = 2;
    }

    this.apiService.Register(this.User).subscribe(d => {
      localStorage.setItem("user", JSON.stringify(d));
      this.route.navigate(['/files']);
    });
  }

  Register(username: string, mail: string, password: string, role: string) {
    if(username == "" && mail == "" && password == "") {
      this.toastr.warning("Lütfen tüm alanları doldurun!", "", {positionClass: 'toastr-top-left'});
    }else if(mail == "") {
      this.toastr.warning("Mail alanı boş bırakılamaz!", "", {positionClass: 'toastr-top-left'});
    }else if(password == "") {
      this.toastr.warning("Parola alanı boş bırakılamaz!", "", {positionClass: 'toastr-top-left'});
    }else if(role == "") {
      this.toastr.warning("Rol seçin!", "", {positionClass: 'toastr-top-left'});
    }else if(username == "") {
      this.toastr.warning("Kullanıcı adı alanı boş bırakılamaz!", "", {positionClass: 'toastr-top-left'});
    }else {
      this.User.Name = username;
      this.User.Mail = mail;
      this.User.Password = password;
      if(role == "Admin") {
        this.User.Role = 1;
      }else {
        this.User.Role = 2;
      }

      this.apiService.Register(this.User).subscribe(d => {
      localStorage.setItem("user", JSON.stringify(d));
      this.route.navigate(['/files']);
      });
    }
  }

}
