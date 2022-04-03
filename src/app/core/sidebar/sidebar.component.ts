import { Component, OnInit } from '@angular/core';
import { Renderer2 } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  isLogged = false;
  
  constructor(private render:Renderer2) { }

  ngOnInit(): void {
  }

  MouseOverHandler(event:any){
    if(event.target.tagName.toLowerCase() === 'a')
    {
      this.render.addClass(event.target,"active");
    }
  }

  MouseOutHandler(event:any){
    if(event.target.tagName.toLowerCase() === 'a')
    {
      this.render.removeClass(event.target,"active");
    }
  }
}
