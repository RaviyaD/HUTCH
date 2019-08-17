import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.css']
})
export class SideNavComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
/*const onclick = function(event) {
    if (!event.target.matches('.dropbtn')) {
      const dropdowns = document.getElementsByClassName('dropdown-content');
      // var dropdowns = document.getElementsByClassName("dropdown-content");
      let i;
      // var i;
      for (i = 0; i < dropdowns.length; i++) {
        const openDropdown = dropdowns[i];
       // let openDropdown = dropdowns[i];
        // var openDropdown = dropdowns[i];
        if (openDropdown.classList.contains('show')) {
          openDropdown.classList.remove('show');
        }

      }
    }
  };*/


}
