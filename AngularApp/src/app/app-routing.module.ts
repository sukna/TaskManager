import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './user/login/login.component';
import { IndexComponent } from './task/index/index.component';
import { FormComponent as TaskFormComponent } from './task/form/form.component';
import { FormComponent as TaskLogFormComponent } from './tasklog/form/form.component';
import { DetailsComponent } from './task/details/details.component';

import { AuthGuardService as AuthGuard } from './services';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: '', component: IndexComponent, canActivate: [AuthGuard] },
  { path: 'task-add', component: TaskFormComponent, canActivate: [AuthGuard] },
  {
    path: 'task-edit/:id',
    component: TaskFormComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'task/:id',
    component: DetailsComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'tasklog-form/:id',
    component: TaskLogFormComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'tasklog-form/:id/:tid',
    component: TaskLogFormComponent,
    canActivate: [AuthGuard],
  },
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
