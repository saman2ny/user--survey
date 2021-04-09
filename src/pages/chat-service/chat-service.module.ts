import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import{ChatUsersListComponent} from '../chat-service/chat-users-list/chat-users-list.component'


const routes: Routes = [
  {
    path: 'chat-list',
    component: ChatUsersListComponent,
    
  }
];

@NgModule({
    // declarations: [],
    imports: [
      CommonModule,
      RouterModule.forChild(routes),
      FormsModule,
      ReactiveFormsModule,
      InfiniteScrollModule,
      // TableModule,
      

    ],
    entryComponents: [],
    declarations: [ChatUsersListComponent]
  })

export class ChatServiceModule { }
