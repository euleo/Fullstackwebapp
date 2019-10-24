import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';

// Components
import { CommentDetailComponent } from './components/comment-detail/comment-detail.component';
import { CommentsListComponent } from './components/comments-list/comments-list.component';

export const routes: Routes = [
  { path: '', component: CommentsListComponent, pathMatch: 'full' },
  {
    path: ':id',
    component: CommentDetailComponent
  },
  { path: '**', redirectTo: '' }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
 