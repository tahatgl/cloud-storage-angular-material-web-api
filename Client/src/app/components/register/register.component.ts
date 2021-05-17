import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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

  constructor(private apiService: ApiService, private route: Router) { }

  ngOnInit() {
  }

  Register(username: string, mail: string, password: string, role: string) {
    this.User.Name = username;
    this.User.Mail = mail;
    this.User.Password = password
    if(role == 'Admin') {
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
