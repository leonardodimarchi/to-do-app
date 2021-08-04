import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'user-tasks' },
  { path: 'user-tasks', loadChildren: () => import ('./pages/user-tasks/user-tasks.module').then(m => m.UserTasksModule)},
  { path: '**', redirectTo: 'user-tasks' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
