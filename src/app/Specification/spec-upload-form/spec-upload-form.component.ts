import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {NgForm} from '@angular/forms';
import {UserServiceService} from '../service/user-service.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Spec} from '../model/spec';
import {HttpClient} from '@angular/common/http';
import {GoogleChartComponent} from 'angular-google-charts';


@Component({
  selector: 'app-spec-upload-form',
  templateUrl: './spec-upload-form.component.html',
  styleUrls: ['./spec-upload-form.component.css']
})
export class SpecUploadFormComponent implements OnInit {

  @ViewChild('UploadSpecForm', {static: false}) form: NgForm;
  chart: GoogleChartComponent;
  temp: Spec;
  specList: Spec [];
  specUp: Spec;
  ELEMENT_DATA: Spec[];
  displayedColumns: string[] = ['specId', 'name', 'category', 'description', 'url', 'actions'];
  categoryList: string[] = ['Tower', 'Shelter', 'Earthing/Electrical',
    'Fence', 'Brackets', 'Grounding', 'Concrete'];
  dataSource = this.ELEMENT_DATA;
  count: number;
  tower: number;
  shel: number;
  eat: number;
  fence: number;
  bracket: number;
  ground: number;
  concrete: number;
  @Input() fileUpload: string;

  title = 'Specifications by category';
  type = 'PieChart';
  data = [
    ['Tower', 3],
    ['Shelter', 6],
    ['Earthing/Electrical', 3],
    ['Fence', 3],
    ['Brackets', 3],
    ['Grounding', 3],
    ['Concrete', 3]
  ];
  columnNames = ['Browser', 'Percentage'];
  options = {
    colors: ['#e0440e', '#e6693e', '#ec8f6e', '#f3b49f', '#f6c7b6', '#e0440e', '#e6693e']
  };
  width = 550;
  height = 300;


  constructor(private upl: UserServiceService, private route: ActivatedRoute, private http: HttpClient, private router: Router) {
    this.specUp = new Spec();
  }
  ngOnInit() {
    this.getSpecList();
    this.specUp = new Spec();
    this.http.post('http://localhost:8080/SpecUpload/Cat/count', {
      category: 'Tower'
    }).toPromise().then(
      (data: any) => {
        this.tower = data;
        this.data = [
          ['Tower', this.tower],
          ['Shelter', this.shel],
          ['Earthing/Electrical', this.eat],
          ['Fence', this.fence],
          ['Brackets', this.bracket],
          ['Grounding', this.ground],
          ['Concrete', this.concrete]
        ];
        console.log(data);
      }
    );

    this.http.post('http://localhost:8080/SpecUpload/Cat/count', {
      category: 'Shelter'
    }).toPromise().then((data: any) => {
        this.shel = data;
        this.data = [
          ['Tower', this.tower],
          ['Shelter', this.shel],
          ['Earthing/Electrical', this.eat],
          ['Fence', this.fence],
          ['Brackets', this.bracket],
          ['Grounding', this.ground],
          ['Concrete', this.concrete]
        ];
      }
    );

    this.http.post('http://localhost:8080/SpecUpload/Cat/count', {
      category: 'Earthing/Electrical'
    }).toPromise().then((data: any) => {
        this.eat = data;
        this.data = [
          ['Tower', this.tower],
          ['Shelter', this.shel],
          ['Earthing/Electrical', this.eat],
          ['Fence', this.fence],
          ['Brackets', this.bracket],
          ['Grounding', this.ground],
          ['Concrete', this.concrete]
        ];
      }
    );

    this.http.post('http://localhost:8080/SpecUpload/Cat/count', {
      category: 'Fence'
    }).toPromise().then((data: any) => {
        this.fence = data;
        this.data = [
          ['Tower', this.tower],
          ['Shelter', this.shel],
          ['Earthing/Electrical', this.eat],
          ['Fence', this.fence],
          ['Brackets', this.bracket],
          ['Grounding', this.ground],
          ['Concrete', this.concrete]
        ];
      }
    );

    this.http.post('http://localhost:8080/SpecUpload/Cat/count', {
      category: 'Brackets'
    }).toPromise().then((data: any) => {
        this.bracket = data;
        this.data = [
          ['Tower', this.tower],
          ['Shelter', this.shel],
          ['Earthing/Electrical', this.eat],
          ['Fence', this.fence],
          ['Brackets', this.bracket],
          ['Grounding', this.ground],
          ['Concrete', this.concrete]
        ];
      }
    );

    this.http.post('http://localhost:8080/SpecUpload/Cat/count', {
      category: 'Grounding'
    }).toPromise().then((data: any) => {
        this.ground = data;
        this.data = [
          ['Tower', this.tower],
          ['Shelter', this.shel],
          ['Earthing/Electrical', this.eat],
          ['Fence', this.fence],
          ['Brackets', this.bracket],
          ['Grounding', this.ground],
          ['Concrete', this.concrete]
        ];
      }
    );

    this.http.post('http://localhost:8080/SpecUpload/Cat/count', {
      category: 'Concrete'
    }).toPromise().then((data: any) => {
        this.concrete = data;
        this.data = [
          ['Tower', this.tower],
          ['Shelter', this.shel],
          ['Earthing/Electrical', this.eat],
          ['Fence', this.fence],
          ['Brackets', this.bracket],
          ['Grounding', this.ground],
          ['Concrete', this.concrete]
        ];
      }
    );
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

  // printing
  print(): void {
    let printContents;
    let popupWin;
    printContents = document.getElementById('print-section').innerHTML;
    popupWin = window.open('', '_blank', 'top=0,left=0,height=100%,width=auto');
    popupWin.document.open();
    popupWin.document.write(`
      <html>
        <head>
          <title>Print tab</title>
          <style>
          //........Customized style.......
          </style>
        </head>
    <body onload="window.print();window.close()">${printContents}</body>
      </html>`
    );
    popupWin.document.close();
  }

}
