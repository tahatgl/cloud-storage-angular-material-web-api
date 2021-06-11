import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private apiService: ApiService, private route: Router,
    private toastr: ToastrService) { }

  ngOnInit() {
    var user = JSON.parse(localStorage.getItem("user"));
    if(user) {
      if(user.Role == 1) {
        this.route.navigate(['/admin']);
      }
      else {
        this.route.navigate(['/files'])
      } 
    }
  }

  Login(mail: string, password: string) {
    this.apiService.Token(mail, password).subscribe(d => {
      if(d) {
        localStorage.setItem("user", JSON.stringify(d));
        var user = JSON.parse(localStorage.getItem("user"));
        if(user.Role == 1) {
          this.route.navigate(['/admin']);
        }
        else {
          this.route.navigate(['/files'])
        }
      }
    }, err => {
      console.log(err.message);
      this.toastr.warning("Hatalı kullanıcı adı veya şifre!", "", {positionClass: 'toastr-top-left'});
    });
  }

}
