import { Location } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { GeneralService } from 'src/app/shared/services/general.service';
import { Blog } from '../../../shared/models/blog.interface';
import { BlogService } from '../../../shared/services/blog.service';

@Component({
  selector: 'app-item',
  templateUrl: './blog-list-item.component.html',
  styleUrls: ['./blog-list-item.component.scss']
})
export class BlogListItemComponent implements OnInit, OnDestroy {
  blogChuckSub!: Subscription;
  blog!: Blog;
  id: string = '';

  constructor(private route: ActivatedRoute, private blogService: BlogService, private router: Router, private genService: GeneralService) { }

  ngOnInit() {
    this.id = this.route.snapshot.fragment;
    this.blogChuckSub = this.blogService.blogChuck.subscribe({ next: (v) => {
      v.forEach(x => {
        if(x.id?.toString() == this.id)
          this.blog = x;
      });
    }});

    if(!this.blog) {
      //this.location.back();
    }
  }

  delete(id: any): void {
    this.blogService.delete(+id);
  }

  sendToEditor(): void {
    this.router.navigate(['/blog', 'edit'], { fragment: this.id });
  }

  back(): void {
    this.genService.goBack();
  }

  ngOnDestroy(): void {
    this.blogChuckSub.unsubscribe();
  }

}
