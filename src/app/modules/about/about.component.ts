import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { AboutService } from './about.service';
import { Cert } from './models/certs.model';
import { Exp } from './models/exp.model';
import { Skills } from './models/skill.model';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: [`./about.component.scss`, './aboutTwo.component.scss', './aboutThree.component.scss'],
  providers: [AboutService]
})

export class AboutComponent implements OnInit, AfterViewInit, OnDestroy {
  data: Exp[];
  skills: Skills[];
  certs: Cert[];
  @ViewChild('certs') certifications!: ElementRef;
  title: string = 'About Me';
  container: any;
  containersChildren: any;
  containersChildrenLength!: number;
  offsetArr: number[] = [];
  otherOffsetArr: number[] = [];
  heightArr: number[] = [];
  widthArr: number[] = [];
  index: number[] = [];
  holdArr: number[] = [];
  timer: any;
  @ViewChild('ul') sideNavUL!: ElementRef;
  navListArr: any[] = [];
  nav: any;
  arrow: any;
  getNewOffsetValues!: EventListener;
  check!: EventListener;
  images: {url: string, alt: string}[] = [];

  constructor(private _aboutService: AboutService) { 
    this.skills = this._aboutService.skills;
    this.data = this._aboutService.data;
    this.certs = this._aboutService.certs;
    this.images = this._aboutService.imageUrls;
    window.scrollTo(0, 0);
  }

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    // getting the certification items
    let certArr = this.certifications.nativeElement.parentElement.children;
    // adding a gray background color to each even one displayed
    for(let i = 1; i < certArr.length; i++) {
      if(i % 2 == 0) {
        certArr[i].style.backgroundColor = 'rgb(' + 20 + ', ' + 20 + ', ' + 20 + ')';
      }
    }

    // elements for the bottom functions
    this.nav = document.querySelector('.side-nav');
    this. arrow = document.querySelector('.nav-open-icon');
    // putting the navigation list on the left side into an array
    this.navListArr = [...this.sideNavUL.nativeElement.children];
    // main area of the about section
    this.container = document.querySelector('.main-area');
    // getting the all the sections, which are children of main-area class
    this.containersChildren = this.container.children;
    this.containersChildrenLength = this.containersChildren.length;
  }






  // adds a slide show to the exp image
  slideshow(event: any): void {
    event.target.classList.add('exp-img-active');
  }

  // removes it
  stopSlideshow(event: any): void {
    event.target.classList.remove('exp-img-active');
  }

  // funciton to open the nav
  go(): void {
    this.arrow.classList.add('nav-icon-hide');
    this.nav.classList.remove('side-nav-inactive');
    this.nav.classList.add('side-nav-active');
  }

  // for the nav that is on the side
  expandNav(): void {
    this.go();
  }

  closeNav(): void {
    if(this.nav.classList.contains('side-nav-active')) {
        this.arrow.classList.remove('nav-icon-hide');
        this.nav.classList.remove('side-nav-active');
        this.nav.classList.add('side-nav-inactive');
    }
  }

  scrollTo(event: any): void {
    const hold = event.target.closest('a').innerText.toLowerCase();
    const elementMatch: any = document.getElementById(hold);
    elementMatch.scrollIntoView();

    if(this.nav.classList.contains('side-nav-active')) {
      this.arrow.classList.remove('nav-icon-hide');
      this.nav.classList.remove('side-nav-active');
    }
  }

  ngOnDestroy() {
    window.removeEventListener('resize', this.getNewOffsetValues);
    document.removeEventListener('scroll', this.check);
  }
}
