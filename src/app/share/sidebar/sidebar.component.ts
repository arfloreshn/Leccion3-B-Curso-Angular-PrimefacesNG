import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  template: `
    <p>
      sidebar works!
    </p>
  `,
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
