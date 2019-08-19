import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-search-map',
  templateUrl: './search-map.component.html',
  styleUrls: ['./search-map.component.css']
})
export class SearchMapComponent implements OnInit {

  isSubmitted = false;

  // Site Names
  Site: any = ['Colombo', 'Kalutara', 'Anuradhapura', 'Jaffna', 'Kalawana'];

  constructor(public fb: FormBuilder) { }

  /*########### Form ###########*/
  searchForm = this.fb.group({
    siteName: ['', [Validators.required]]
  });


  // Choose site using select dropdown
  changeSite(e) {
    console.log(e.value);
    this.siteName.setValue(e.target.value, {
      onlySelf: true
    });
  }

  // Getter method to access formcontrols
  get siteName() {
    return this.searchForm.get('siteName');
  }

  /*########### Template Driven Form ###########*/
  onSubmit() {
    this.isSubmitted = true;
    if (!this.searchForm.valid) {
      return false;
    } else {
      alert(JSON.stringify(this.searchForm.value));
    }

  }



  ngOnInit() {
  }

}
