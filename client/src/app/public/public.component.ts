import { Component, OnInit } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ClipComponent } from '../clip/clip.component';
import { NewClipComponent } from '../new-clip/new-clip.component';

@Component({
  selector: 'app-public',
  templateUrl: './public.component.html',
  styleUrls: ['./public.component.less']
})
export class PublicComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
