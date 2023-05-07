import {Injectable} from '@angular/core';
import {AngularFireAuth} from "@angular/fire/compat/auth";
import firebase from "firebase/compat";
import {error} from "@angular/compiler-cli/src/transformers/util";
import {user} from "@angular/fire/auth";

@Injectable({
  providedIn: 'root'
})
export class AuthServService {
  constructor(private auth: AngularFireAuth) {
  }

  login(email: string, pwd: string) {
    console.log("bejelentkeztem");
    return this.auth.signInWithEmailAndPassword(email, pwd);
  }

  registUser(emial: string, pwd: string) {
    return this.auth.createUserWithEmailAndPassword(emial, pwd);
  }

  isUserLoggedIn() {
    return this.auth.user;
  }

  logout() {
    return this.auth.signOut();
  }

  async updateUserPwd(pwd: string){
    try {
      const user = await this.auth.currentUser;
      // @ts-ignore
      await user.updatePassword(pwd);
      console.log('Password updated successfully');
    } catch (error) {
      console.error('Error changing password:', error);
    }
  }

  delete(){
     return this.auth.currentUser.then(user =>{
      user?.delete();
      this.logout().catch(() =>{
        console.log("logged out");

      }).catch(error =>{
        console.error(error);
      })
    }).catch(error =>{
      console.log(error);
    });
  }
}
