import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private apiService: ApiService, private route: Router) { }

  ngOnInit() {
    var user = JSON.parse(localStorage.getItem("user"));
    if(user) {
      this.route.navigate(['/files']);
  }
  }

  Login(mail: string, password: string) {
    this.apiService.Login(mail, password).subscribe(d => {
      localStorage.setItem("user", JSON.stringify(d));
      this.route.navigate(['/files']);
    }, err => {
      console.log(err);
    });
  }

}
