
import { Component, OnInit } from '@angular/core';
import { interval, Subscription } from 'rxjs';
import { Video } from 'src/app/shared/models/video.model';
import { VideoService } from '../../shared/services/video.service';

@Component({
    selector: 'app-tv',
    templateUrl: './tv.component.html',
    styleUrls: [`./tv.component.scss`]
})

export class TvComponent implements OnInit {
    videos: Video[] = [];
    videoPlaying!: Video;
    choices: string[] = ['recent', 'oldest'];
    preTitle: string = 'Lastest Video: ';
    intervalSub!: Subscription;
    loading: boolean = true;

    constructor(private videoService: VideoService) {}

    ngOnInit(): void {
        this.videoService.getVideos().subscribe((x: Video[]) => {  
            this.videoService.getUploadedVideoTimes(x);
            this.videoPlaying = x[0];
            this.videos = x;     
            this.videoSetup();   
            this.loading = false;
        }, err => {
            console.log(err.message);
            this.loading = false;
        });
    }

    videoSetup(): void {
        if(this.videoPlaying) {
            const videoContainer = document.querySelector('.current-video');
            if(videoContainer) {
                videoContainer.innerHTML = this.videoPlaying.src;
            }
            const frame = document.querySelector('iframe');
            if(frame && frame.width != '100%') {
                frame.width = '100%';
                frame.height = '100%';
            }
        }
    }

    reorder(): void {
        this.videos = this.videoService.getVideosInReverse(this.videos);
    }

    playVideo(index: number): void {
        // comapre this value with title value in video array and select that video to be played
        const selected = this.videos[index];
        if(selected != this.videoPlaying) {
            this.videoPlaying = selected;
            this.videoSetup();
        }
    }

    //starts the video preview
    startPreview(i: number): void {
        /* const screenshots = this.videos[i].poster;
        const imgElement = document.querySelectorAll('.coll-img')[i];
        if(imgElement) {
            let count = 1;
            this.intervalSub = interval(400).subscribe(x => {
                if(count > 4) {
                    count = 1;
                }
                if(x % 2 == 0) {
                   imgElement.setAttribute('src', screenshots[count]); 
                   count++;
                }
            });
        } */
    }

    // this method resets the orignal screenshot and stops preview
    stopPreview(): void {
        /* this.intervalSub.unsubscribe(); */
    }

}