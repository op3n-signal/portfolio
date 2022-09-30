import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { BlogService } from './shared/services/blog.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title: string = 'porfolio';

  constructor(private blogService: BlogService, private route: ActivatedRoute, private router: Router) {
 
  }

  ngOnInit(): void {
  }
}
