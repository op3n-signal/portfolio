import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ProjectService } from './projects.service';
import { Project } from './project.model';

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.scss', './portfolioTwo.component.scss'],
  providers: [ProjectService]
})
export class PortfolioComponent implements OnInit {
  private direction = {
    next: 'next',
    prev: 'prev'
  }
  basicProjectData: Project[] = [];
  incomingData: Project[];
  imgLength: number = 3;
  mainImage: string = ``;
  title: string = '';
  siteUrl: string = '';
  details: string[] = [];
  letterArr: string[] = ['', 'b', 'c', 'd'];
  logoClassNames: string[] = [
    'html',
    'css',
    'sass',
    'bs',
    'js',
    'react',
    'ng',
    'php',
    'cs',
    'net',
    'sql'
  ];
  counter: number = 0;
  status: string = '';

  constructor(private _projectService: ProjectService) { 
    //getting the projects from the service
    this.incomingData = this._projectService.getProjects();

    //going through the retrieved projects and selecting specific data to send to child
    for(let i = 0; i < this.incomingData.length; i++) {  
      this.basicProjectData.push(this.incomingData[i]);      
    }
    this.title = this.basicProjectData[0].title;
    this.siteUrl = this.basicProjectData[0].siteUrl;
    this.mainImage = `url(\'/assets/images/${this.basicProjectData[0].imagePath[0]}.webp\')`;
    this.basicProjectData[0].data.forEach(x => this.details.push(x));
    this.status = this.basicProjectData[0].status ? this.basicProjectData[0].status: 'Complete';
  }

  ngOnInit(): void {
    this.setLogos(0);
  }

  setLogos(index: number) {
    const current = this.basicProjectData[index];
    this.logoClassNames.forEach((logo: string) => {
      //setting the current logo to not be displayed
      let el = document.querySelector('.' + logo); 
      if(el)
        el.classList.remove('show-icon');
      //checking if the logo is in the projects logo array
      //if it is then show it
      for(let i = 0; i < current.langLogos.length; i++) {   
        if(logo === current.langLogos[i]) {
          let el = document.querySelector('.' + logo);   
          if(el)
            el.classList.add('show-icon');
        }
      }
      
    });
  }

  // display logos dynamically
  displayProject(index: number): void {
    const currentProject = this.basicProjectData[index];
    this.title = currentProject.title;
    this.siteUrl = currentProject.siteUrl;
    this.mainImage = `url(\'/assets/images/${currentProject.imagePath[0]}.webp\')`;
    this.details.splice(0);
    currentProject.data.forEach(x => this.details.push(x));
    this.status = currentProject.status ? currentProject.status: 'Complete';
    this.setLogos(index);
  }

  //only to switch image displayed currently below
  prevphoto(img: string): void {
    setTimeout(() => {
      this.mainImage = `${this.alterImgPath(img, this.direction.prev)}`;
    }, 500);
  }

  nextphoto(img: string): void {
    setTimeout(() => {
      this.mainImage = `${this.alterImgPath(img, this.direction.next)}`;
    }, 500);
  }

  alterImgPath(path: string, direction: string) {
    //setting the counter to a direction
    if(direction === this.direction.next) {
      this.counter++;
      if(this.counter > 3) {
        this.counter = 0
      }
    } else if(direction === this.direction.prev) {
      this.counter--;
      if(this.counter < 0) {
        this.counter = 3
      }
    }
    //regex to use to check if the 27th index is a letter or '.'
    const regex = /[a-z]/;
    let holdArr = [];
    let imgPath: string = path;

    holdArr = imgPath.split('');
    if(imgPath[27].match(regex)) {
      holdArr.splice(27, 1, this.letterArr[this.counter]);
    } else {
      holdArr.splice(27, 0, this.letterArr[this.counter]);
    }
    let newPath = holdArr.join('');

    return newPath;
  }
}
