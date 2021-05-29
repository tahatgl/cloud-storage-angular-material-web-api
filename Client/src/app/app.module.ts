import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { FileListComponent } from './components/file-list/file-list.component';
import { MaterialModule } from './material.module';
import { ApiService } from './services/api.service';
import { LoginComponent } from './components/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RegisterComponent } from './components/register/register.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AdminComponent } from './components/admin/admin.component';
import { UserListComponent } from './components/user-list/user-list.component';
import { FileListForAdminComponent } from './components/file-list-for-admin/file-list-for-admin.component';
import { UserUpdateDialogComponent } from './components/dialogs/user-update-dialog/user-update-dialog.component';
import { UserFileListForAdminComponent } from './components/user-file-list-for-admin/user-file-list-for-admin.component';

@NgModule({
  declarations: [
    AppComponent,
    FileListComponent,
    LoginComponent,
    RegisterComponent,
    AdminComponent,
    UserListComponent,
    FileListForAdminComponent,
    UserUpdateDialogComponent,
    UserFileListForAdminComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MaterialModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule
  ],
  providers: [ApiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
