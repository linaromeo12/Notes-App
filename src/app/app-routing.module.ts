import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NoteCardComponent } from './note-card/note-card.component';
import { MainLayoutComponent } from './pages/main-layout/main-layout.component';
import { NotesListComponent } from './pages/notes-list/notes-list.component';
import { NoteDetailsComponent } from './pages/note-details/note-details.component';


const routes: Routes = [
  { path: '', component: MainLayoutComponent, children: [
    { path: '', component: NotesListComponent }, 
    { path: 'new', component: NoteDetailsComponent },
    { path: ':id', component: NoteDetailsComponent }
  ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
