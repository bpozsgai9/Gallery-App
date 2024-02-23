import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit, OnChanges {

  @Input() galleryObjectInput?: Array<any>;
  @Output() imageObjectEmitter: EventEmitter<any> = new EventEmitter();
  choosenImage: any;

  constructor() {
    
  }

  ngOnChanges(): void {
    if (this.galleryObjectInput) {
      this.choosenImage = this.galleryObjectInput[0];
      this.reload();
    }
  }

  ngOnInit(): void {

    
  }

  reload() { 
    this.imageObjectEmitter.emit(this.choosenImage);
  }
}
