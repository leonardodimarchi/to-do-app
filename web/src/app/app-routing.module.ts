import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'groups' },
  { path: 'groups', loadChildren: () => import ('./pages/groups/groups.module').then(m => m.GroupsModule) },
  { path: '**', redirectTo: 'groups' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
