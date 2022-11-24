import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {MatChipInputEvent} from "@angular/material/chips";
import {COMMA, ENTER} from "@angular/cdk/keycodes";
import {ActivatedRoute} from "@angular/router";
import {VideoService} from "../services/video.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {VideoDto} from "../dto/video-dto";
export interface Tags {
  name: string;
}
@Component({
  selector: 'app-save-video-details',
  templateUrl: './save-video-details.component.html',
  styleUrls: ['./save-video-details.component.css']
})
export class SaveVideoDetailsComponent implements OnInit {

  saveVideoDetails: FormGroup;
  title: FormControl = new FormControl('');
  description: FormControl = new FormControl('');
  videoStatus: FormControl = new FormControl('');
  addOnBlur = true;
  readonly separatorKeysCodes = [ENTER, COMMA] as const;
  tags: string[] = [];
  selectedFile!: File;
  selectedFileName = '';
  videoId = '';
  fileSelected = false;
  videoUrl!: string;
  thumbnailUrl!: string;



  constructor(private activatedRoute: ActivatedRoute, private videoService: VideoService, private matSnackBar: MatSnackBar) {
    this.videoId = this.activatedRoute.snapshot.params['videoId'];
    this.videoService.getAllVideoDetails(this.videoId).subscribe(data => {
      this.videoUrl = data.videoUrl;
      this.thumbnailUrl = data.thumbnailUrl;
      }
    )
    this.saveVideoDetails = new FormGroup({
      title: this.title,
      description: this.description,
      videoStatus: this.videoStatus,
      }
    )
  }

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    // Add our tag
    if (value) {
      this.tags.push(value);
    }

    // Clear the input value
    event.chipInput!.clear();
  }

  remove(tag: string): void {
    const index = this.tags.indexOf(tag);

    if (index >= 0) {
      this.tags.splice(index, 1);
    }
  }

  ngOnInit(): void {
  }

  onFileSelected(event: Event) {
    // @ts-ignore
    this.selectedFile = event.target.files[0];
    this.selectedFileName = this.selectedFile.name;
    this.fileSelected = true;
  }

  onUpload() {
    this.videoService.uploadThumbnail(this.selectedFile, this.videoId)
      .subscribe(data => {
        console.log(data);
        this.matSnackBar.open("Create", "ok");
      })
  }

  onSave() {
    const saveVideoMetadata: VideoDto = {
      "id": this.videoId,
      "title": this.saveVideoDetails.get('title')?.value,
      "description": this.saveVideoDetails.get('description')?.value,
      "tags": this.tags,
      "videoUrl": this.videoUrl,
      "videoStatus": this.saveVideoDetails.get('videoStatus')?.value,
      "thumbnailUrl": this.thumbnailUrl
    }
    this.videoService.saveVideo(saveVideoMetadata).subscribe(data => {
      this.matSnackBar.open("Save", "Ok");
    })
  }
}
