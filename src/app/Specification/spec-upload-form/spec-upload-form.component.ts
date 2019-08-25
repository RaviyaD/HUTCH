import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {NgForm} from '@angular/forms';
import {UserServiceService} from '../service/user-service.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Spec} from '../model/spec';
import {Observable} from 'rxjs';
import {HttpEvent, HttpRequest} from '@angular/common/http';

@Component({
  selector: 'app-spec-upload-form',
  templateUrl: './spec-upload-form.component.html',
  styleUrls: ['./spec-upload-form.component.css']
})
export class SpecUploadFormComponent implements OnInit {

  @ViewChild('UploadSpecForm', {static: false}) form: NgForm;
  temp: Spec;

  specUp: Spec;

  @Input() fileUpload: string;

  constructor(private upl: UserServiceService, private route: ActivatedRoute, private router: Router) {
    this.specUp = new Spec();
  }

  onSubmitUpload() {
    console.log('before');
    this.upl.save(this.specUp).subscribe(result => this.goToSpecItem());
    console.log('after');
    window.location.reload();
  }

  goToSpecItem() {
    this.router.navigate(['/uploadRes']);

  }

  ngOnInit() {
  }

}
