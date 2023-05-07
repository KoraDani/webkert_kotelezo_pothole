import { Component } from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {Router} from "@angular/router";
import {LogServService} from "../../shared/services/log-serv.service";
import {AuthServService} from "../../shared/services/auth-serv.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  constructor(private authServ: AuthServService, private router: Router, private logServ: LogServService) {
  }
  loginform: FormGroup = new FormGroup({
    email: new FormControl(),
    pwd: new FormControl()
  });


  login(){
    this.authServ.login(this.loginform.get('email')?.value, this.loginform.get('pwd')?.value).then(cred =>{
      // @ts-ignore
      this.logServ.getUserById(cred.user?.uid).subscribe(user =>{
        console.log(user?.coins);
        localStorage.setItem('coins', String(user?.coins));
      },error =>{
        console.error(error);
      })
      console.log(cred);
      this.router.navigateByUrl("/list");
    }).catch(error =>{
      console.error(error);
    });
  }
}
