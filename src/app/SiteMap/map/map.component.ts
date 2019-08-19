import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {
  lat = 7.8774;
  lng = 80.7003;
  constructor() { }

  ngOnInit() {
  }

}
