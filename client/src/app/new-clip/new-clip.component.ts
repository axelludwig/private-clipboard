import { Component, OnInit } from '@angular/core';
import { Input } from '@angular/core';
import { MainService } from '../main.service';

@Component({
  selector: 'app-new-clip',
  templateUrl: './new-clip.component.html',
  styleUrls: ['./new-clip.component.less']
})
export class NewClipComponent implements OnInit {

  @Input() content: string;
  title = 'private-clipboard';
  title2 = 'salut'
  private: boolean;

  constructor(private mainService: MainService) { }

  ngOnInit(): void {
    this.mainService.test();
  }



  public test() {
  console.log(this.content);
  console.log(this.private)
}

  public test2() {
  console.log(this.title2)
}

}
