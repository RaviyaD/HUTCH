import { Component, OnInit } from '@angular/core';
import {Remark} from '../model/remark';
import {ActivatedRoute, Router} from '@angular/router';
import {RemarkServiceService} from '../service/remark-service.service';

@Component({
  selector: 'app-addremark',
  templateUrl: './addremark.component.html',
  styleUrls: ['./addremark.component.css']
})
export class AddremarkComponent implements OnInit {

  remarks: Remark;

  constructor(private route: ActivatedRoute, private router: Router, private remarkService: RemarkServiceService) {
    this.remarks = new Remark();
  }

  onSubmit() {
    this.remarkService.save(this.remarks).subscribe(result => this.gotoRemarkList());
  }

  gotoRemarkList() {
    this.router.navigate(['/MapRemark']);
  }

  ngOnInit() {
  }

}
