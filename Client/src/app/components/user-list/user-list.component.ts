import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Result } from 'src/app/models/result';
import { User } from 'src/app/models/user';
import { ApiService } from 'src/app/services/api.service';
import { UserUpdateDialogComponent } from '../dialogs/user-update-dialog/user-update-dialog.component';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  users: User[];
  dataSource: any;
  role: number;
  displayedColumns = ['ID', 'Name', 'Mail', 'Password', 'Role', 'Functions'];
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  dialogRef: MatDialogRef<UserUpdateDialogComponent>;

  constructor(private apiService: ApiService, private matDialog: MatDialog) { 
    var user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      this.role = user.Role;
    }
  }

  ngOnInit() {
    this.UserList();
  }

  UserList() {
    this.apiService.UserList(this.role).subscribe((d: User[]) => {
      this.users = d;
      if(this.users) {
        for(let x of this.users) {
          if(x.Role == 1) {
            x.Rol = "Admin"
          }
          else {
            x.Rol = "Normal"
          }
        }
      }
      this.dataSource = new MatTableDataSource(this.users);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    }, err => {
      console.log(err);
    });
  }

  UpdateUser(user: User) {
    this.dialogRef = this.matDialog.open(UserUpdateDialogComponent, {
      width: '400px',
      data: {
        user: user
      }
    });
    this.dialogRef.afterClosed().subscribe(d => {
      if(d) {
        user.Mail = d.Mail;
        user.Name = d.Name;
        user.Password = d.Password;
        if(d.Rol == "Admin") {
          user.Role = 1;
        } else {
          user.Role = 2;
        }

        this.apiService.UpdateUser(user).subscribe((q: Result) => {
          if(q.process) {
            this.UserList();
          }
          else {
            console.log("bok");
          }
        });
      }
    });
  }

  Logout() {
    localStorage.clear();
    //this.route.navigate(['/login']);
    location.href = "/";
  }

}
