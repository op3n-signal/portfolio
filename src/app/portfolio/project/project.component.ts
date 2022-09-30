import { Component, OnInit, Input, AfterContentInit } from '@angular/core';
import { Project } from '../project.model';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss']
})
export class ProjectComponent implements OnInit, AfterContentInit {
  // un means the heading, deux means the imagePath, trois means the sitelink
  @Input() data!: Project;
  image: string = '';
  photo : string = '';

  constructor() {
    //initiating the data var 
  }

  ngOnInit(): void {
  }

  ngAfterContentInit(): void {
    //if the data is retreived, then I get the imagePath string and surround it with quotes to insert in the dom
    if(this.data.data[0]) {
      this.image = this.data.imagePath[0];
      this.image = '\'/assets/images/' + this.image + '.webp\'';
      this.photo = `url(${this.image})`;
    }
  }
  

}
