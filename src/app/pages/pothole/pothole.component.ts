import {Component} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {PotServService} from "../../shared/services/pot-serv.service";
import {Router} from "@angular/router";
import {PotholeModel} from "../../shared/model/PotholeModel";
import {AuthServService} from "../../shared/services/auth-serv.service";


@Component({
  selector: 'app-pothole',
  templateUrl: './pothole.component.html',
  styleUrls: ['./pothole.component.scss']
})
export class PotholeComponent {
  success?: string = "";
  potMod?: PotholeModel;
  constructor(private potService: PotServService, private router: Router, private auth: AuthServService) {

  }
  potholeForm: FormGroup = new FormGroup({
    orszag: new FormControl(),
    varos: new FormControl(),
    utca: new FormControl(),
    hazszam: new FormControl(),
    karNagysaga: new FormControl()
  });


  savePothole() {
    // @ts-ignore
    this.potMod = this.potholeForm.value;
    const user = JSON.parse(localStorage.getItem('user') as string);
    // @ts-ignore
    this.potMod.userid = user.uid;
    console.log(this.potMod?.userid);
    this.potService.savePothole(this.potholeForm.value).then(_ => {
      console.log("sikeres");
      this.success = "Sikeres kátyú jelentés";
      this.router.navigateByUrl("/list");
    }).catch(error => {
      console.error(error);
      this.success = "Sikertelen kátyú jelentés";
    });
  }
}

