import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-status-box',
  templateUrl: './status-box.component.html',
  styleUrls: ['./status-box.component.css']
})

export class StatusBoxComponent implements OnInit, OnChanges {
  @Input() statusHtml: string;

  sanitizedHtml: SafeHtml;

  constructor(private sanitizer: DomSanitizer) {}

  ngOnInit() {}

  get _sanitizedHtml(): SafeHtml{
    return this.sanitizer.bypassSecurityTrustHtml(this.statusHtml);
  }

  ngOnChanges(changes: SimpleChanges){
    this.sanitizedHtml = this.sanitizer.bypassSecurityTrustHtml(changes.statusHtml.currentValue);
  }

}
