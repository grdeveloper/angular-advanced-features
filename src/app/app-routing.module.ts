import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AppComponent} from './app.component';
import {CommentsComponent} from './comments/comments.component';


const routes: Routes = [
  {path: '', component: AppComponent},
  {path: 'comments', component: CommentsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
