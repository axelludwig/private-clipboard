import { JsonPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { Input } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})


export class AppComponent implements OnInit {
  @Input() content: string;
  title = 'private-clipboard';
  private: boolean;

  constructor() {

  }

  ngOnInit() {

  }

  public test() {
    console.log(this.content);
    console.log(this.private)
  }
}

