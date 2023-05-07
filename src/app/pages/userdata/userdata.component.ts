import {Component, OnInit} from '@angular/core';
import {LogServService} from "../../shared/services/log-serv.service";
import {UserModel} from "../../shared/model/UserModel";
import {FormControl, FormGroup} from "@angular/forms";
import {AuthServService} from "../../shared/services/auth-serv.service";
import {error} from "@angular/compiler-cli/src/transformers/util";
import {Router} from "@angular/router";

@Component({
  selector: 'app-userdata',
  templateUrl: './userdata.component.html',
  styleUrls: ['./userdata.component.scss']
})
export class UserdataComponent implements OnInit{
  imagerArray: Array<string> = ["female1", "female2", "female3", "male1", "male2", "robin-hood", "unicorn", "worker-women", "worker-men", "capybara"];
  panelOpenState = false;
  success?: string = "";
  constructor(private authServ: AuthServService, private logServ: LogServService, private router: Router) {
  }
  uid?: string = "";
  username?: string = "";
  email?: string = "";
  picture?: string = "capybara";
  coins?: number = 0;

  resetpwd: FormGroup = new FormGroup({
    newpwd1: new FormControl(),
    newpwd2: new FormControl()
  });
  newUData: FormGroup = new FormGroup({
    username: new FormControl(),
    picture: new FormControl()
  });

  ngOnInit(): void {
    this.authServ.isUserLoggedIn().subscribe(user =>{
      this.logServ.getUserById(user?.uid as string).subscribe(data =>{
        this.uid = data?.id;
        this.username = data?.username;
        this.email = data?.email;
        this.picture = data?.picture;
        this.coins = data?.coins;
      },error => {
        console.log(error);
      })
    });
  }
  resetPassword(){
    if(this.resetpwd.get("newpwd1")?.value == this.resetpwd.get("newpwd2")?.value){
      this.authServ.updateUserPwd(this.resetpwd.get('newpwd1')?.value).then(() =>{
      }).catch(error =>{
        console.log(error);
      }).finally(() => {
        this.resetpwd.get('newpwd1')?.setValue("");
        this.resetpwd.get('newpwd2')?.setValue("");
      });
      this.success = "Sikeres jelszó változtatás";
    }else {
      this.success = "Sikertelen jelszó változtatás";
    }
  }

  updateUserData(){
    const usermod: UserModel | any = {
      id: this.uid,
      username: this.newUData.get('username')?.value != null ? this.newUData.get('username')?.value : this.username,
      email: this.email,
      picture: this.newUData.get('picture')?.value != null ? this.newUData.get('picture')?.value : this.picture
    };
    this.logServ.updateUserNameAndEmailDB(usermod).then(() => {
      console.log('sikeres frissítés');
      this.success = "Sikeres adat frissítés";
    }).catch(error => {
      console.error(error);
      this.success = "Sikertelen adat frissítés";
    }).finally(() => {
      this.newUData.get('username')?.setValue("");
      this.newUData.get('picture')?.setValue("");
    });
  }
  deleteUser(){
    this.authServ.delete().catch(() => {
      console.log("sikeres törlés");
    }).catch(error =>{
      console.error(error);
    }).finally( () =>{
      this.router.navigateByUrl("/login");
    });
  }
}
