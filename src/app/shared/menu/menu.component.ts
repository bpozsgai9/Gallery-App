import { AfterViewInit, Component, EventEmitter, Input, Output } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements AfterViewInit {

  @Input() currentPage: string = '';
  @Input() loggedInUser?: firebase.default.User | null;
  @Output() selectedPage: EventEmitter<string> = new EventEmitter();
  @Output() onCloseSidenav: EventEmitter<boolean> = new EventEmitter();
  @Output() onLogout: EventEmitter<boolean> = new EventEmitter();

  constructor() {
    console.log('constructor called!');
  }
  
  ngAfterViewInit(): void {
    console.log('afterViewInit called!');
  }

  menuSwitch() {
    this.selectedPage.emit(this.currentPage);
  }

  close(logOut?: boolean) {
    this.onCloseSidenav.emit(true);
    if (logOut === true) {
      this.onLogout.emit(logOut);
    }
    
  }

}
