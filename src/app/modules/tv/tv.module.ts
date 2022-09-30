import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TvComponent } from './tv.component';
import { FormsModule } from '@angular/forms';
import { TvRoutingModule } from './tv-routing.module';
import { VideoItemComponent } from './video-item/video-item.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    TvRoutingModule
  ],
  declarations: [
    TvComponent,
    VideoItemComponent
  ]
})
export class TvModule { }
