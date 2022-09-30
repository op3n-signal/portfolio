import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { GeneralService } from 'src/app/shared/services/general.service';
import { Blog } from '../../../shared/models/blog.interface';
import { BlogService } from '../../../shared/services/blog.service';

@Component({
  selector: 'app-write',
  templateUrl: './write.component.html',
  styleUrls: ['./write.component.css']
})
export class WriteComponent implements OnInit {
  blog: Blog = {
    title: 'title',
    category: 'category',
    article: 'content',
    month: 0,
    day: 1,
    year: 2022,
    img: 'https://th.bing.com/th/id/R.8c985a68a6db66a72abc332a0eaa9a63?rik=%2fx4q9C%2fQQ3ITcQ&pid=ImgRaw&r=0',
    when: 'today'
  };

  error = '';
  success = '';

  constructor(private blogService: BlogService, private genService: GeneralService) {}

  ngOnInit(): void {
  }

  resetAlerts(): void {
    this.error = '';
  }

  addBlog(f: NgForm): void {
      this.resetAlerts();
      this.blogService.create(this.blog);

  }

  back(): void {
    this.genService.goBack();
  }
}
