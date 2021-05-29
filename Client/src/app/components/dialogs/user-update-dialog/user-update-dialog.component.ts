import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-user-update-dialog',
  templateUrl: './user-update-dialog.component.html',
  styleUrls: ['./user-update-dialog.component.css']
})
export class UserUpdateDialogComponent implements OnInit {
  user: User;
  frm: FormGroup;
  Roles: any = ['Admin', 'Normal'];

  constructor(public dialogRef: MatDialogRef<UserUpdateDialogComponent>, private frmBuild: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any) { 
      this.user = data.user;
      this.frm = this.FormBuild();
    }

  ngOnInit() {
  }

  FormBuild() {
    return this.frmBuild.group({
      Name: [this.user.Name],
      Mail: [this.user.Mail],
      Password: [this.user.Password],
      Rol: [this.user.Rol],
    });
  }

}
