import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Files } from 'src/app/models/files';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-file-list-for-admin',
  templateUrl: './file-list-for-admin.component.html',
  styleUrls: ['./file-list-for-admin.component.css']
})
export class FileListForAdminComponent implements OnInit {
  files: Files[];
  user: any;
  dataSource: any;
  displayedColumns = ['UserID', 'CreatedTimestamp', 'Names', 'ContentTypes', 'Description', 'Functions'];
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private apiService: ApiService) { 
    this.user = JSON.parse(localStorage.getItem("user"));
  }

  ngOnInit() {
    this.FileList();
  }

  FileList() {
    this.apiService.FileList(this.user.ID, this.user.Role).subscribe((d: Files[]) => {
      this.files = d;
      this.dataSource = new MatTableDataSource(this.files);
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
    localStorage.clear();
    //this.route.navigate(['/login']);
    location.href = "/";
  }

}
