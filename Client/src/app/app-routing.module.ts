import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './components/admin/admin.component';
import { FileListForAdminComponent } from './components/admin/file-list-for-admin/file-list-for-admin.component';
import { FileListComponent } from './components/file-list/file-list.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { UserFileListForAdminComponent } from './components/admin/user-file-list-for-admin/user-file-list-for-admin.component';
import { UserListComponent } from './components/admin/user-list/user-list.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'login'
  },
  {
    path: 'files',
    component: FileListComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'admin',
    component: AdminComponent
  },
  {
    path: 'users',
    component: UserListComponent
  },
  {
    path: 'filesadmin',
    component: FileListForAdminComponent
  },
  {
    path: 'userfiles/:ID/:Role',
    component: UserFileListForAdminComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
