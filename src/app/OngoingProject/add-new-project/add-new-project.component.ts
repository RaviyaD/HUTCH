import {Component, OnInit} from '@angular/core';
import {ViewChild} from '@angular/core';
import {FormControl, NgForm} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import {ProjectServicesService} from '../view-ongoing-project/ProjectServices';
import {IProject} from '../Project';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-add-new-project',
  templateUrl: './add-new-project.component.html',
  styleUrls: ['./add-new-project.component.css']
})
export class AddNewProjectComponent implements OnInit {

  myControl = new FormControl();
  options: string[] = ['P001', 'P002', 'P003'];
  filteredOptions: Observable<string[]>;

  constructor(private route: ActivatedRoute, private router: Router, private projectService: ProjectServicesService) {
  }

  @ViewChild('f', {static: false}) siteForm: NgForm;
  insert: IProject = {
    projectId: null, projectName: null, projectType: null, projectPriority: null,
    startingDate: null, completionPeriod: null, status: null, details: null, teamId: null,
  };

  ngOnInit() {
    this.filteredOptions = this.myControl.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filter(value))
      );
  }
  gotoViewProject() {
    this.router.navigate([]);
  }

  onSubmit() {
    this.insert.projectId = this.siteForm.value.projectId;
    this.insert.projectName = this.siteForm.value.projectName;
    this.insert.projectType = this.siteForm.value.projectType;
    this.insert.projectPriority = this.siteForm.value.projectPriority;
    this.insert.startingDate = this.siteForm.value.startingDate;
    this.insert.completionPeriod = this.siteForm.value.completionPeriod;
    this.insert.status = this.siteForm.value.status;
    this.insert.details = this.siteForm.value.details;
    this.insert.teamId = this.siteForm.value.teamId;
    console.log(this.insert.projectId);
    this.projectService.addProject(this.insert).subscribe();
    window.location.reload();
    this.gotoViewProject();
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }
}
