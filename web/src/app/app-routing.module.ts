import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoggedGuard } from './guards/logged.guard';

const unLoggedRoute = {
  canActivate: [LoggedGuard],
  data: { routeToRedirect: 'groups', isProtectedRoute: false },
};

const loggedRoute = {
  canActivate: [LoggedGuard],
  data: { routeToRedirect: 'login', isProtectedRoute: true },
};

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'login' },
  { path: 'login', loadChildren: () => import ('./pages/login/login.module').then(m => m.LoginModule), ...unLoggedRoute },
  { path: 'register', loadChildren: () => import ('./pages/register/register.module').then(m => m.RegisterModule), ...unLoggedRoute },
  { path: 'groups', loadChildren: () => import ('./pages/task-groups/task-groups.module').then(m => m.TaskGroupsModule), ...loggedRoute },
  { path: '**', redirectTo: 'login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
