import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserTasksComponent } from './pages/user-tasks/user-tasks.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'user-tasks' },
  { path: 'user-tasks', component: UserTasksComponent},
  { path: '**', redirectTo: 'user-tasks' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
