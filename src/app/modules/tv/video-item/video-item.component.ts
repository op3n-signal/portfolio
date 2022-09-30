import { Component, Input, OnInit } from '@angular/core';
import { Video } from 'src/app/shared/models/video.model';

@Component({
  selector: 'app-video-item',
  templateUrl: './video-item.component.html',
  styleUrls: ['./video-item.component.scss']
})
export class VideoItemComponent implements OnInit {
  @Input() data!: { videoData: Video, index: number};
  videos: Video[] = [];

  constructor() { }

  ngOnInit(): void {
    this.data.videoData.date = new Date(this.data.videoData.date);
    this.videos.push(this.data.videoData);
    //const videoParent = document.querySelectorAll('.video-parent');
    //const currentParent = videoParent[this.index];

    //if(currentParent) {
      
      /* const widthRegex = /width="[0-9]+"/;
      const heightRegex = /height="[0-9]+"/;
      this.video = this.video.replace(widthRegex, 'width="100%"').replace(heightRegex, 'height="100%"');
      currentParent.innerHTML += this.video; */
    //}
  }

}
