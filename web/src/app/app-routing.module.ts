import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'login' },
  { path: 'login', loadChildren: () => import ('./pages/login/login.module').then(m => m.LoginModule) },
  { path: 'register', loadChildren: () => import ('./pages/register/register.module').then(m => m.RegisterModule) },
  { path: 'task-groups', loadChildren: () => import ('./pages/task-groups/task-groups.module').then(m => m.TaskGroupsModule) },
  { path: '**', redirectTo: 'login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
