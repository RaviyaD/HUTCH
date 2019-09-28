import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {NgForm} from '@angular/forms';
import {UserServiceService} from '../service/user-service.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Spec} from '../model/spec';
import {Observable} from 'rxjs';

import {HttpErrorResponse, HttpEvent, HttpRequest} from '@angular/common/http';

@Component({
  selector: 'app-spec-upload-form',
  templateUrl: './spec-upload-form.component.html',
  styleUrls: ['./spec-upload-form.component.css']
})
export class SpecUploadFormComponent implements OnInit {

  @ViewChild('UploadSpecForm', {static: false}) form: NgForm;
  temp: Spec;
  specList: Spec [];
  specUp: Spec;
  ELEMENT_DATA: Spec[];
  displayedColumns: string[] = ['specId', 'name', 'category', 'description', 'url', 'actions'];
  categoryList: string[] = ['Ca1', 'cat2', 'cat3', 'cat4'];
  dataSource = this.ELEMENT_DATA;

  @Input() fileUpload: string;

  constructor(private upl: UserServiceService, private route: ActivatedRoute, private router: Router) {
    this.specUp = new Spec();
  }
  ngOnInit() {
    this.getSpecList();
    this.specUp = new Spec();
  }

  onSubmitUpload() {


    /*if (this.specUp.specId === 0) {*/
      console.log('sub');
      this.upl.save(this.specUp).subscribe(result =>
        this.getSpecList() );
      this.specUp = new Spec();
    /*} else {
      console.log('update');
      this.onUpdate(this.specUp.specId, this.specUp );
    }*/
    // this.goToSpecItem()

    // console.log('after');
    // window.location.reload();
  }

  onUpdate(id, specUp) {
    this.upl.update(id, specUp).subscribe(result =>
      this.getSpecList() );
    this.specUp = new Spec();

  }
  getSpecList() {
    this.upl.findAll().subscribe(data => {
      this.specList = data;
      this.ELEMENT_DATA = data;
      this.dataSource = data;
    });
  }
  viewSpec(id) {
    this.upl.getSpecById(id).subscribe(data => {
      this.specUp = data;
    });
  }

  deleteSpec(id) {
    this.upl.deleteSpecById(id);
    setTimeout(() => {
      this.getSpecList();
    }, 2000);
  }
  goToSpecItem() {
    this.router.navigate(['/uploadRes']);

  }



}
