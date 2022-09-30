import { EventEmitter, Injectable, OnInit } from '@angular/core';
import { Blog } from '../models/blog.interface';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map, take } from 'rxjs/operators';
import { Observable, ReplaySubject } from 'rxjs';
import { VideoService } from 'src/app/shared/services/video.service';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { Location } from '@angular/common';

@Injectable({
    providedIn: 'root'
})

export class BlogService implements OnInit {
    reversed: Blog[] = [];
    click = new EventEmitter<boolean>();
    baseUrl: string = '';
    blogChuck = new ReplaySubject<Blog[]>();
    blogs: Blog[] = [];

    constructor(
        private http: HttpClient, 
        private videoService: VideoService, 
        private router: Router,
        private location: Location) {}

    ngOnInit(): void {}

    getHomeBlogs(): Observable<Blog[]> {
        return this.http.get<Blog[]>(`${this.baseUrl}home`).pipe(take(1), map((x:any) => x['data']));
    }

    setBlogs(data: Blog[]): void {
        this.videoService.getUploadedBlogTimes(data);
        this.blogChuck.next(data); 
    }

    //getting blogs for current page
    getBlogs(page?: string): void {
        const pageRequest: string = page == undefined ? '1' : page;
        const params = new HttpParams().append("query", pageRequest);
    
        this.http.get(`${this.baseUrl}list`, { params: params }).pipe(
            map((res: any) => res['data'])).subscribe(
            (data: any) => {
                if(data.length > 0) {
                    if(data[data.length - 1].title == 'err') 
                    {
                        this.setPage('1');   
                    }
                    this.setBlogs(data);
                }
            },
            (err) => {
                console.error(err.message + ' Blogs not retrieved!');
            });
    }

    //filtered get method
    getFilteredBlogs(page: string, category: string, sort: string): void {
        const params = new HttpParams()
            .append("page", page)
            .append("category", category)
            .append("sort", sort);

        this.http.get(`${this.baseUrl}filteredList`, { params: params }).pipe(map((x: any) => x['data'])).subscribe((data: any) => {
            if(data.length > 0) {
                this.setBlogs(data);
            }
        }, err => {
            console.log(err);
        });
    }


    search(page:string, searchQuery: string, category: string, sort: string): void {
        const params = new HttpParams()
            .append("page", page)
            .append("search", searchQuery)
            .append("category", category)
            .append("sort", sort);

        this.http.get(`${this.baseUrl}search`, { params: params }).pipe(map((res: any) => res['data'])).subscribe((x: any) => {
            if(x && x.length > 0) {
                //send search query to blog component
                if(x[0].title != '?')
                    this.setBlogs(x);
                else 
                    this.setPage(page, category, sort, searchQuery + '?');
            }
        }, err => {
            console.log(err);
        });
    }

    //to create a single blog
    create(blog: Blog): void {
        this.http.post(`${this.baseUrl}store`, { data: blog}).pipe(map((res:any) => res['data'])).subscribe((x: Blog) => {
            alert('Blog Created!');
            this.router.navigate(['/blog'], { queryParams: { page: '1'} });
        }, err => {
            console.log(err);
        });
    }


    //to delete a single blog
    delete(id: number): void {
        this.http.post(`${this.baseUrl}delete`, { data: id }).pipe(map((res: any) => res)).subscribe((res: any) => {
            alert(res);
            this.router.navigate(['/blog']).then(() => {
                location.reload();
            });  
        }, err => {
            console.log(err);
        });
    }


    //edit a blog
    edit(blog: Blog): void {
        this.http.post<Observable<any>>(`${this.baseUrl}edit`, { data: blog}).pipe(map((res: any) => res)).subscribe((res: any) => {
           this.location.back();
        }, err => {
            console.log(err);
        });
    }


    //reverse the order of blogs, although this can be done through mysql
    getBlogsReverse(content: Blog[]): Blog[] {
        //console.log(typeof(content));
        this.reversed = [];
        content.forEach(x => {
            this.reversed.unshift(x);
        });
        return this.reversed;
    }


    setPage(page: string, category?: string, sort?: string, search?: string): void {
        if(!category && !sort)
            this.router.navigate([], { queryParams: { page: page } });
        else if(!search)
            this.router.navigate([], { queryParams: { page: page, category: category, sort: sort } });
        else 
            this.router.navigate([], { queryParams: { page: page, category: category, sort: sort, search: search } });
    }
}