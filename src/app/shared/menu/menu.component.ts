import { Component,OnInit,AfterViewInit, EventEmitter, Output, Input } from '@angular/core';
import {AngularFireAuth} from "@angular/fire/compat/auth";
import firebase from "firebase/compat";
import {AuthServService} from "../services/auth-serv.service";

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent {
  @Input() currentPage: string = '';
  @Input() loggedInUser?: firebase.User | null;
  @Output() onLogout: EventEmitter<boolean> = new EventEmitter();
  @Output() selectedPage: EventEmitter<string> = new EventEmitter();
  @Output() onCloseSidenav: EventEmitter<boolean> = new EventEmitter();

  constructor(private authService: AuthServService, private auth: AngularFireAuth) {
  }
  userLoged = this.authService.isUserLoggedIn();

  logout(){
    this.onLogout.emit(true);
  }
  close() {
    this.onCloseSidenav.emit(true);
  }
}
