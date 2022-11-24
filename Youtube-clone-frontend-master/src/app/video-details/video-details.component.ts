import { Component, OnInit } from '@angular/core';
import {VideoService} from "../services/video.service";

@Component({
  selector: 'app-video-details',
  templateUrl: './video-details.component.html',
  styleUrls: ['./video-details.component.css']
})
export class VideoDetailsComponent implements OnInit {

  constructor(videoService: VideoService) { }

  ngOnInit(): void {
  }

  getAllVideoDetails() {

  }

}
