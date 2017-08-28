import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import * as io from 'socket.io-client';
import { AuthService } from '../auth.service';
import { ChapterService } from '../chapter.service';

declare var lib:any;
declare var hterm:any;

@Component({
  selector: 'app-terminal',
  templateUrl: './terminal.component.html',
  styleUrls: ['./terminal.component.css']
})
export class TerminalComponent implements OnInit, AfterViewInit {
  //@ViewChild('terminal') domTerm;
  constructor(private authService:AuthService,
              private chapterService:ChapterService) {

  }

  ngOnInit() {}
  ngAfterViewInit() {
    console.log(hterm);
    console.log(lib);
    //console.log(this.domTerm);
    var socket = io.connect('http://localhost:8000/', {
      path: `/${this.chapterService.currentChapter}/wetty/socket.io`,
      query: 'token=' + this.authService.getToken()
    });


    var term;
    var buf = '';

    function Wetty(argv) {
      this.argv_ = argv;
      this.io = null;
      this.pid_ = -1;
    }

    Wetty.prototype.run = function() {
      this.io = this.argv_.io.push();

      this.io.onVTKeystroke = this.sendString_.bind(this);
      this.io.sendString = this.sendString_.bind(this);
      this.io.onTerminalResize = this.onTerminalResize.bind(this);
    }

    Wetty.prototype.sendString_ = function(str) {
      socket.emit('input', str);
    };

    Wetty.prototype.onTerminalResize = function(col, row) {
      socket.emit('resize', { col: col, row: row });
    };

    socket.on('connect', function() {
      lib.init(function() {
        hterm.defaultStorage = new lib.Storage.Local();
        term = new hterm.Terminal();
        (<any>window).term = term;
        term.decorate(document.getElementById('terminal'));
        //term.decorate(this.domTerm.nativeElement);

        term.setCursorPosition(0, 0);
        term.setCursorVisible(true);
        term.prefs_.set('ctrl-c-copy', true);
        term.prefs_.set('ctrl-v-paste', true);
        term.prefs_.set('use-default-window-copy', true);

        term.runCommandClass(Wetty, document.location.hash.substr(1));
        socket.emit('resize', {
          col: term.screenSize.width,
          row: term.screenSize.height
        });

        if (buf && buf != '')
        {
          term.io.writeUTF16(buf);
          buf = '';
        }
      });
    });

    socket.on('output', function(data) {
      if (!term) {
        buf += data;
        return;
      }
      term.io.writeUTF16(data);
    });

    socket.on('disconnect', function() {
      console.log("Socket.io connection closed");
    });

  }

}
