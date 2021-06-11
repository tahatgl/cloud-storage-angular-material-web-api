import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { Files } from 'src/app/models/files';
import { ApiService } from 'src/app/services/api.service';
import * as fileSaver from 'file-saver';

@Component({
  selector: 'app-user-file-list-for-admin',
  templateUrl: './user-file-list-for-admin.component.html',
  styleUrls: ['./user-file-list-for-admin.component.css']
})
export class UserFileListForAdminComponent implements OnInit {
  files: Files[];
  id: number;
  role: number;
  dataSource: any;
  displayedColumns = ['UserID', 'CreatedTimestamp', 'Names', 'ContentTypes', 'Description', 'Functions'];
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private apiService: ApiService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe(p => {
      this.id = p.ID;
      this.role = p.Role;
      this.FileList();
    })
  }

  FileList() {
    this.apiService.FileList(this.id, this.role).subscribe((d: Files[]) => {
      this.files = d;
      this.dataSource = new MatTableDataSource(this.files);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });
  }

  DeleteFile(id: number) {
    this.apiService.DeleteFile(id).subscribe(q => {
      this.FileList();
    });
  }

  DownloadFile(id: number, type: string, name: string) {
    this.apiService.FileDownload(id).subscribe(res => {
      let blob: any = new Blob([res], { type: type });
      const url = window.URL.createObjectURL(blob);
      window.open(url);
      fileSaver.saveAs(blob, name);
    });
  }

  Logout() {
    localStorage.clear();
    //this.route.navigate(['/login']);
    location.href = "/";
  }

}
