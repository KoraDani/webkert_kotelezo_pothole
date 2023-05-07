import {Component} from '@angular/core';
import {LogServService} from "../../shared/services/log-serv.service";
import {FormControl, FormGroup} from "@angular/forms";
import {Router} from "@angular/router";
import {UserModel} from "../../shared/model/UserModel";
import {AuthServService} from "../../shared/services/auth-serv.service";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {

  success?: string = "";

  constructor(private logservice: LogServService, private authServ: AuthServService, private router: Router) {
  }

  imagerArray: Array<string> = ["female1", "female2", "female3", "male1", "male2", "robin-hood", "unicorn", "worker-women", "worker-men", "capybara"];

  regform: FormGroup = new FormGroup({
    username: new FormControl(),
    email: new FormControl(),
    pwd1: new FormControl(),
    pwd2: new FormControl(),
    picture: new FormControl()
  });

  registration() {
    if (this.regform.get("pwd1")?.value == this.regform.get("pwd2")?.value) {
      this.authServ.registUser(this.regform.get('email')?.value, this.regform.get('pwd1')?.value).then(cred => {
        const user: UserModel = {
          id: cred.user?.uid as string,
          username: this.regform.get('username')?.value,
          email: this.regform.get('email')?.value,
          picture: this.regform.get('picture')?.value,
          coins: 0
        };
        this.logservice.createUserInDB(user).then(cred => {
          console.log(cred);
          console.log("user added top DB");
          this.success = "Sikeres regisztráció";
        }).catch(error => {
          console.log(error);
          console.log("user error created in db finally");
          this.success = "Sikertelen regisztráció";
        }).finally(() => {
          console.log("user created in db finally");
        });
        console.log(cred);
        this.success = "Sikeres regisztráció";
        this.router.navigateByUrl("/list");
      }).catch(error => {
        console.error(error);
        this.success = "Sikertelen regisztráció";
      }).finally(() => {
        console.log("finally");
      });
    } else {
      this.success = "Sikertelen regisztráció";
    }
  }
}

