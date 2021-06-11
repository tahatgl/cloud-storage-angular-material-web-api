import { Component, OnInit, ViewChild } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { Files } from 'src/app/models/files';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { Router } from '@angular/router';
import * as fileSaver from 'file-saver';

@Component({
  selector: 'app-file-list',
  templateUrl: './file-list.component.html',
  styleUrls: ['./file-list.component.css']
})
export class FileListComponent implements OnInit {
  files: Files[];
  user: any;
  dataSource: any;
  displayedColumns = ['Names', 'ContentTypes', 'Description', 'Functions'];
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  selected: FileList;
  uploadFile: Files;

  description: string = null;

  constructor(private apiService: ApiService, private route: Router) {
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

  DownloadFile(file: Files) {
    this.apiService.FileDownload(file.ID).subscribe(res => {
      let blob: any = new Blob([res], { type: file.ContentTypes });
      const url = window.URL.createObjectURL(blob);
      window.open(url);
      fileSaver.saveAs(blob, file.Names);
    });
  }

  Logout() {
    localStorage.clear();
    //this.route.navigate(['/login']);
    location.href = "/";
  }

  SelectFile(event) {
    this.selected = event.target.files;
  }

  Upload(input: HTMLInputElement) {
    const reader = new FileReader();
    reader.readAsDataURL(input.files[0]);
    reader.onload = () => {
      var user = JSON.parse(localStorage.getItem("user"));
      const imageName = input.files[0].name;
      const postImage = new FormData();
      postImage.append('file', input.files[0], imageName);
      postImage.append('UserID', user.ID)
      postImage.append('Description', this.description);
      this.apiService.FileUpload(postImage).subscribe(q => {
        this.FileList();
        this.selected = undefined;
        this.description = null;
      }, err => {
        console.log(err.message);
      });
    };

  }

}
