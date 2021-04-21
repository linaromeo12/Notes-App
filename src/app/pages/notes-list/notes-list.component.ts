import { animate, style, transition, trigger, query, stagger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { Note } from 'src/app/shared/note.model';
import { NotesService } from 'src/app/shared/notes.service';


@Component({
  selector: 'app-notes-list',
  templateUrl: './notes-list.component.html',
  styleUrls: ['./notes-list.component.scss'], 
  animations: [
    trigger('itemAnim', [
      // Entry animation
      transition('void => *', [
        // Initial states 
        style({
          height: 0, 
          opacity: 0, 
          transform: 'scale(0.85)', 
          'margin-bottom': 0, 

          //we have to expand the padding properties
          paddingTop: 0, 
          paddingBottom: 0,
          paddingRight: 0, 
          paddingLeft: 0, 

        }),
        // we first want to animate the spacing (which inclues height and margin)
        animate('50ms', style({
          height: '*', 
          'margin-bottom': '*', 
          paddingTop: '*', 
          paddingBottom: '*',
          paddingRight: '*', 
          paddingLeft: '*', 

        })), 
        //animate final state 
        animate(68)
      ]), 
      transition('* => void', [
        //first scale up 
        animate(50, style({
          transform: 'scale(1.05)'
        })), 
        //then scale down while begining to fade out 
        animate(50, style({
          transform: 'scale(1)', 
          opacity: 0.75
        })), 
        // scale down and fade out completely 
        animate('120ms ease-out', style({
          transform: 'scale(0.68)', 
          opacity: 0, 
        })), 

        // then animate the spacing which includes height and margin 
        animate('150ms ease-out', style({
          opacity: 0, 
          height: 0, 
          paddingTop: 0, 
          paddingBottom: 0,
          paddingRight: 0, 
          paddingLeft: 0, 
          'margin-bottom': '0'
          
        }))
      ])
    ]), 
    trigger('listAnim', [
      transition('* => *', [
        query(':enter', [
          style({
            opacity: 0, 
            height: 0, 

          }), 
          stagger(100, [
            animate('0.2s ease')
          ])
        ], {
          optional: true
        })
      ])
    ])
  ]
})

export class NotesListComponent implements OnInit {
  notes: Note[] = new Array<Note>(); 
  filteredNotes: Note[] = new Array<Note>(); 
  
  constructor(private notesService: NotesService) { }

  ngOnInit(): void {
    //retrieve all notes from noteservice 
    this.notes = this.notesService.getAll(); // return all notes
    this.filteredNotes = this.notes; 
  }
  deleteNote(id: number){
    this.notesService.delete(id); 
  }
  filter(query: string){
    query = query.toLowerCase().trim(); 

    let allResults: Note[] = new Array<Note>(); 
    //split up the search query into individual words
    let terms: string[] = query.split(' '); //split on spaces
    //remove duplicate 
    terms = this.removeDuplicates(terms); 
    //compile all relevent results into all results array 
    terms.forEach(term => {
      let results: Note[] = this.relevantNotes(term); 
      //append results to the allresults array 
      allResults = [...allResults, ...results]; 
    }); 

    //allResults will include duplicate notes because a term note can be the results of many matches 
    // we have to remove duplicates 
    let uniqueResults = this.removeDuplicates(allResults); 
    this.filteredNotes = uniqueResults; 

  }
  removeDuplicates(arr: Array<any>){
    let uniqueResults: Set<any> = new Set<any>(); 
    // loop through the set 
    arr.forEach(e => uniqueResults.add(e)); 

    return Array.from(uniqueResults); 

  }

  relevantNotes(query: string): Array<Note>{
    query = query.toLowerCase().trim(); 
    let relevantNotes = this.notes.filter(note => {
      if (note.title && note.title.toLowerCase().includes(query)){
        return true; 
      }
      if (note.body && note.body.toLowerCase().includes(query)){
        return true; 
      }
      return false; 
    })

    return relevantNotes; 
  }

}
