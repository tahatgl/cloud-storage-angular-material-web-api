import { Component, OnInit, ViewChild } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { Files } from 'src/app/models/files';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { Router } from '@angular/router';
@Component({
  selector: 'app-file-list',
  templateUrl: './file-list.component.html',
  styleUrls: ['./file-list.component.css']
})
export class FileListComponent implements OnInit {
  files: Files[];
  userId: number;
  roleId: number;
  dataSource: any;
  displayedColumns = ['Names', 'ContentTypes', 'Description' ,'Functions'];
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  selected: FileList;
  uploadFile: Files;

  constructor(private apiService: ApiService, private route: Router) { 
    var user = JSON.parse(localStorage.getItem("user"));
    this.userId = user.ID;
    this.roleId = user.Role;}

  ngOnInit() {
    this.FileList();
    
  }

  FileList() {
    this.apiService.FileList(this.userId, this.roleId).subscribe((d: Files[]) => {
      this.files = d;
      this.dataSource = new MatTableDataSource(d);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });
  }

  DeleteFile(id: number) {
    this.apiService.DeleteFile(id).subscribe(q => {
      this.FileList();
    })
  }

  Logout() {
    localStorage.removeItem("user");
    this.route.navigate(['/login']);
  }

  SelectFile(event) {
    this.selected = event.target.files;
  }

  Upload() {
    const file = this.selected.item(0);
    this.selected = undefined;

    this.uploadFile = new Files(file);
    var user = JSON.parse(localStorage.getItem("user"));
    this.uploadFile.UserID = user.ID;
    this.apiService.FileUpload(this.uploadFile).subscribe(q => {
      this.FileList();
    }, err => {
      console.log(err.message);
    });
  }

}
