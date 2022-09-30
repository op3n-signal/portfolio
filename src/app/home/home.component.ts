import { Component, OnDestroy, OnInit } from '@angular/core';
import { BlogService } from '../shared/services/blog.service';
import { Blog } from '../shared/models/blog.interface';
import { Video } from '../shared/models/video.model';
import { VideoService } from '../shared/services/video.service';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: [
    './home.component.scss', 
    './homeTwo.component.scss', 
    './homeThree.component.scss', 
    './homeFour.component.scss',
    './homeFive.component.scss']
})

export class HomeComponent implements OnInit {
  div!: Element | null;
  blogs: Blog[] = [];
  video!: Video;
  homeVid!: Element | null;
  step1!: Element | null;
  step2!: Element | null;
  step3!: Element | null;
  step4!: Element | null;
  step5!: Element | null;
  touchEnd: number = 0;
  scrollPosition: number = 0;
  query: number = 0;
  query2: number = 0;
  navigation!: Element | null;
  navLink: string = '';
  loading: boolean = true;

  constructor(private _videoService: VideoService, private blogService: BlogService) {     
  }

  ngOnInit(): void {
    this.blogService.getHomeBlogs().subscribe((x: Blog[]) => this.blogs = x);

    this._videoService.getVideo()
      .subscribe((x: string) => {
        const videoContainer = document.querySelector('.vid');
        if(videoContainer) {
          videoContainer.innerHTML = x;
          let frame = document.querySelector('iframe');
          if(frame) {
            frame.width = '100%';
            frame.height = '100%';
          }
          this.loading = false;
        } 
      }, err => {
        if(err == HttpErrorResponse) {
          console.error(err.message);
          this.loading = false;
        }
    });

    this.div = document.querySelector('.content');
    this.step1 = document.querySelector('.step-1');
    this.step2 = document.querySelector('.step-2');
    this.step3 = document.querySelector('.step-3');
    this.step4 = document.querySelector('.step-4');
    this.step5 = document.querySelector('.step-5');
    this.homeVid = document.querySelector('.vid');
    this.navigation = document.querySelector('nav');
    
    //function expression for scoll events
    let show = (e: any) => {
      this.query = document.body.clientHeight;

      if(!e.touches) {
        this.scrollPosition = e.target.documentElement.scrollTop;

        if(this.scrollPosition > 100 && this.scrollPosition < 500) {
          this.div?.classList.add('content-active');
        }
        //determine the when to show content based on the client height
        if(this.query < 4500) {

          if(this.scrollPosition > 550) {
            this.addVid();
          }

          if(this.scrollPosition > 1200) {
            this.addBoxes();
            window.removeEventListener('scroll', show);
          }

        } else if(this.query > 4500 && this.query < 5450) {

            if(this.scrollPosition > 1750) {
              this.addVid();
            }

            if(this.scrollPosition > 2000) {
              this.addBoxes();
              window.removeEventListener('scroll', show);
            }
        } else if(this.query > 5450) {

          if(this.scrollPosition > 1750) {
            this.addVid();
          }

          if(this.scrollPosition > 3000) {
            this.addBoxes();
            window.removeEventListener('scroll', show);
          }
        }
      } 
    }

    //function expression for touch events
    let touchShow = (e:any) => {
      this.query2 = document.body.clientHeight;

      if(e.type == 'touchend') {
       
        this.touchEnd = e.view.scrollY;

        if(this.touchEnd > 200 && this.touchEnd < 500) {
          this.div?.classList.add('content-active');
        }
        //determine the when to show content based on the client height
        if(this.query2 < 4500) {

          if(this.touchEnd > 550) {
            this.addVid();
          }

          if(this.touchEnd > 1500) {
            this.addBoxes();
            window.removeEventListener('touchend', touchShow);
          }

        } else if(this.query2 > 4500 && this.query2 < 5350) {

            if(this.touchEnd > 1750) {
              this.addVid();
            }

            if(this.touchEnd > 2800) {
              this.addBoxes();
              window.removeEventListener('touchend', touchShow);
            }
        } else if(this.query2 > 5350) {

          if(this.touchEnd > 1750) {
            this.addVid();
          }

          if(this.touchEnd > 3400) {
            this.addBoxes();
            window.removeEventListener('touchend', touchShow);
          }
        }
      } 
    }
    //used to detect a click from nav then turn off listeners
    let navClick = (e: any) => {
      if(e.target.closest('a')) {
        this.navLink = e.target.innerText.toLowerCase();
        if(
          this.navLink == 'devtv' || 
          this.navLink == 'about me' || 
          this.navLink == 'blog' || 
          this.navLink == 'projects' ||
          this.navLink == 'login' ||
          this.navLink == 'contact') {
          window.removeEventListener('scroll', show);
          window.removeEventListener('touchend', touchShow);
          this.navigation?.removeEventListener('click', navClick);
        }
      }  
    }

    window.addEventListener('touchend', touchShow);
    window.addEventListener('scroll', show);
    this.navigation?.addEventListener('click', navClick);
    
  }

  addVid(): void {
    this.homeVid?.classList.add('vid-slide-active');
  }

  addBoxes(): void {
    this.step1?.classList.add('move-step');
    setTimeout(() => {
      this.step2?.classList.add('move-step');
    }, 500);
    setTimeout(() => {
      this.step3?.classList.add('move-step');
    }, 1000);
    setTimeout(() => {
      this.step4?.classList.add('move-step');
    }, 1500);
    setTimeout(() => {
      this.step5?.classList.add('move-step');
    }, 2000);
  }

  //hover over images and changes tint height
  slideUp(event: any): void {
    let element;

    if(event.target.closest('.tinty')) {
      element = event.target.closest('.tinty');
    } else {
      element = event.target.closest('.un');
      element = element.firstChild.nextSibling;
    }
    // adjusting the height of the tint from the current image hovered on
    element.classList.add('active-tinty');
    
  }

  slideDown(event: any): void {
    //removing the added tint height
    let element = event.target.lastChild;
    element.classList.remove('active-tinty');
    // removing the sample text opacity
    let sampleText = element.lastChild;
    sampleText.classList.remove('active-sample');
  }
}
