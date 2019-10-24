import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';

// Components
import { UserDetailComponent } from './components/user-detail/user-detail.component';
import { UsersListComponent } from './components/users-list/users-list.component';

export const routes: Routes = [
  { path: '', component: UsersListComponent, pathMatch: 'full' },
  {
    path: ':id',
    component: UserDetailComponent
  },
  { path: '**', redirectTo: '' }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
 