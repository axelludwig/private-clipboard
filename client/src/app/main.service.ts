import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';

@Injectable({
  providedIn: 'root'
})
export class MainService {

  private url = 'http://localhost:8080';
  public socket;

  constructor() {
    this.socket = io(this.url);
    console.log('ok')
  }


  test() {
    this.socket.on('connectUser', (room) => {
      
    });
  }
}
