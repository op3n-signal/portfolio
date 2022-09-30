import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Blog } from '../models/blog.interface';
import { Video } from '../models/video.model';

@Injectable({
    providedIn: 'root',
})

export class VideoService implements OnInit {
    private videos: Video[] = [];
    private currentDate: Date = new Date();

    constructor(private http: HttpClient) {}

    ngOnInit(): void {
    }

    getVideo(): Observable<string> {
        return this.http.get<string>(`${environment.api}vid`).pipe(take(1), map((res: any) => {
            return res['body'].embed.html;
        }));
    }

    //method that maps vimeo data returned to video object
    dataToVideo(data: any): Video {
        const date = new Date(data.created_time);

        return new Video(
            data.embed.html,
            Math.floor(data.duration / 60).toString() + ':' + (data.duration % 60).toString(),
            'today',
            date.getFullYear(),
            date.getMonth(),
            date.getDate(),
            data.name,
            date,
            data.stats.plays,
            data.pictures.sizes[3].link
        );
    }

    getVideos(): Observable<Video[]> {
        return this.http.get<Video[]>(`${environment.api}vids`).pipe(take(1), map((x: any) => {
            let data = x['body']['data'];
            
            //need to map data to video objects
            data.forEach((d: any) => {
                this.videos.push(this.dataToVideo(d));
            });
            return this.videos;
        }));
    }

    //getting the videos in reverse order from the current order
    getVideosInReverse(videos: Video[]): Video[] {
        const newVideoArr: Video[] = [];
        videos.forEach((x: Video) => {
            newVideoArr.unshift(x);
        });
        return newVideoArr;
    }

    //getting how long ago I uploaded this video
    getUploadedVideoTimes(videos: Video[]): void {
        videos.forEach((el: Video) => {
            let returnedMonths: string = this.getMonthsBehind(el.year, el.month, el.day);
            el.when = this.getTimeFormat(returnedMonths);
        });
    }

    getUploadedBlogTimes(blogs: Blog[]): void {
        blogs.forEach((el: Blog) => {
            let returnedMonths: string = this.getMonthsBehind(el.year, el.month, el.day);
            el.when = this.getTimeFormat(returnedMonths);
        });
    }

    //alogirthm to determine how much time ago the video was uploaded...returning days
    getMonthsBehind(year: number, month: number, day: number): string {
        const oldDate: Date = new Date(year, month, day);
        const currentDateUtc: number = Date.UTC(this.currentDate.getFullYear(), this.currentDate.getMonth(), this.currentDate.getDate());
        let oldDateUtc: number = Date.UTC(oldDate.getFullYear(), oldDate.getMonth(), oldDate.getDate());
        const daysAgo: number = 1000 * 60 * 60 * 24;

        const monthsEquation : number = (((currentDateUtc - oldDateUtc)/daysAgo)/30);
        if(monthsEquation >= 1) {
            return Math.floor(monthsEquation).toString();
        }
        
        return ((((currentDateUtc - oldDateUtc)/daysAgo)/30) * 30).toString() + 'd';//I mark days with d to differentiate them from months
    }
    //setting the format for years, months, days since the the video was uploaded
    getTimeFormat(returnedMonths: string) {
        let years = Math.floor(+returnedMonths/12);
        if(years > 0) 
        {
            if(years == 1) {
                return years + ' yr ago';
            }
            return years + ' yrs ago';
        } 
        else if(+returnedMonths) 
        {
            return returnedMonths + ' mo ago';
        }
        else 
        {
            let daysAgo = parseInt(returnedMonths);
            if(daysAgo == 0) {
                return 'today';
            } else if(daysAgo == 1) {
                return daysAgo + ' day ago';
            }
            return daysAgo + ' days ago';
        }
    }
} 