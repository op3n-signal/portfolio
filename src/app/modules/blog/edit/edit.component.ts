import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Blog } from 'src/app/shared/models/blog.interface';
import { BlogService } from '../../../shared/services/blog.service';
import { NgForm } from '@angular/forms';
import { GeneralService } from 'src/app/shared/services/general.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit, OnDestroy {
  blog: Blog = {
    title: '',
    category: '',
    article: '',
    month: 1,
    day: 1,
    year: 2022,
    img: ''
  };
  blogSub!: Subscription;

  constructor(private route: ActivatedRoute, private blogService: BlogService, private genService: GeneralService) { }

  ngOnInit(): void {
    const routeId = this.route.snapshot.fragment;
    this.blogSub = this.blogService.blogChuck.subscribe({ next: (v) => v.findIndex((el, index) => {
        if(el.id == +routeId) {
          this.blog = el;
          return;
        }
      })
    });
  }

  update(f: NgForm) {
    if(f.pristine != true) {
      this.blogService.edit(this.blog);
    }
  }

  back():void {
    this.genService.goBack();
  }

  ngOnDestroy(): void {
      this.blogSub.unsubscribe();
  }
}
