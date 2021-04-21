import { Component, OnInit, ViewChild, ElementRef, Renderer2, Input, Output, EventEmitter} from '@angular/core';


@Component({
  selector: 'app-note-card',
  templateUrl: './note-card.component.html',
  styleUrls: ['./note-card.component.scss']
})
export class NoteCardComponent implements OnInit {
  

  @Input() title: string; 
  @Input() body: string; 
  @Input() link: string; 

  @Output('delete') deleteEvent: EventEmitter<void> = new EventEmitter<void>(); 

  @ViewChild(('truncator'), {static:true}) truncator: ElementRef<HTMLElement>; 
  @ViewChild(('bodyText'), {static:true}) bodyText: ElementRef<HTMLElement>; 

  constructor(private renderer: Renderer2) { }
  
  ngOnInit() {
    console.log("hello"); 
    // work out if there is a text overflow, if not then hide the truncator 
    let style = window.getComputedStyle(this.bodyText.nativeElement, null); 
    let viewableHeight = parseInt(style.getPropertyValue("height"), 10); 

    // when there is a text overflow, the truncator block shows 
    if (this.bodyText.nativeElement.scrollHeight > viewableHeight){
      this.renderer.setStyle(this.truncator.nativeElement, 'display', 'block'); 
    } 
    

    else {
      // there is a text overflow, hide the fade out truncator
      this.renderer.setStyle(this.truncator.nativeElement, 'display', 'none'); 
    }
    
  }
  onXButtonClick(){
    this.deleteEvent.emit(); 

  }
  

}
