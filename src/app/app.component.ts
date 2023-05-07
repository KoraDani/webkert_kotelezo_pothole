import { Component,OnInit,AfterViewInit, EventEmitter, Output, Input } from '@angular/core';
import {Router} from "@angular/router";
import {MatSidenav} from "@angular/material/sidenav";
import firebase from "firebase/compat";
import {AuthServService} from "./shared/services/auth-serv.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'pothole';
  page = 'main';

  // @ts-ignore
  loggedInUser: firebase.User | null;
  constructor(private router: Router, private auth: AuthServService) {
  }

  ngOnInit(){
    this.auth.isUserLoggedIn().subscribe(user=>{
      this.loggedInUser = user;
      localStorage.setItem('user', JSON.stringify(this.loggedInUser));
    },error =>{
      console.error(error);
      localStorage.setItem('user', JSON.stringify('null'));
      localStorage.setItem('coins', JSON.stringify(''));
    });
  }

  changePage(selectedPage: string){
    this.title = selectedPage;
    this.router.navigateByUrl(selectedPage);
  }

  onToggleSidenav(sidenav: MatSidenav) {
    sidenav.toggle();
  }

  onClose(event: any, sidenav: MatSidenav) {
    if(event === true){
      sidenav.close();
    }
  }

  logout(_?: boolean) {
    this.auth.logout().then(() =>{
      console.log('logged out succesfully');
      localStorage.setItem('coins', '');
      this.router.navigateByUrl("/login");
    }).catch(error=>{
      console.error(error);
    });
  }
}
