import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  user: any;

  constructor() { 
    this.user = JSON.parse(localStorage.getItem("user"));
  }

  ngOnInit() {
  }

  Logout() {
    localStorage.clear();
    //this.route.navigate(['/login']);
    location.href = "/";
  }

}
