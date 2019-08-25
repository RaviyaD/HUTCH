import { Component, OnInit } from '@angular/core';
import {Spec} from '../model/spec';
import {UserServiceService} from '../service/user-service.service';
import {ActivatedRoute, Router} from '@angular/router';


@Component({
  selector: 'app-spec-view-com',
  templateUrl: './spec-view-com.component.html',
  styleUrls: ['./spec-view-com.component.css']
})
export class SpecViewComComponent implements OnInit {

  specs: Spec[];
  spec: Spec;

  constructor(private userService: UserServiceService, private route: ActivatedRoute, private router: Router) {
      this.spec = new Spec();
  }

  ngOnInit() {
    this.userService.findAll().subscribe(data => {
      this.specs = data;
    });
  }

  onSubmit() {
    this.userService.save(this.spec).subscribe(result => this.toList());
  }

  toList() {
    this.router.navigate(['/Site']);
  }
}
