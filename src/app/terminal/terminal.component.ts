import { Component, OnInit } from '@angular/core';
import '../../assets/temp.js';

declare var MyObj:any;

@Component({
  selector: 'app-terminal',
  templateUrl: './terminal.component.html',
  styleUrls: ['./terminal.component.css']
})
export class TerminalComponent implements OnInit {

  constructor() {
    console.log("got here!");
    console.log(MyObj);
  }

  ngOnInit() {
  }

}
