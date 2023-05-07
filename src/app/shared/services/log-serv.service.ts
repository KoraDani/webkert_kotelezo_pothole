import { Injectable } from '@angular/core';
import {AngularFireAuth} from "@angular/fire/compat/auth";
import {UserModel} from "../model/UserModel";
import {AngularFirestore} from "@angular/fire/compat/firestore";

@Injectable({
  providedIn: 'root'
})
export class LogServService {

  // @ts-ignore
  userModel: UserModel;
  constructor(private afs: AngularFirestore, private auth: AngularFireAuth) { }
  collectionName: string = 'Users';

  //READ
  getUserById(uid: string){
    return this.afs.collection<UserModel>(this.collectionName).doc(uid).valueChanges();
  }


  //CREATE
  createUserInDB(user: UserModel){
    console.log("createUserInDB called");
    return this.afs.collection(this.collectionName).doc(user.id).set(user);
  }

  //UPDATE
  update(uid: any, email: string, name: string, picture: string){
    // @ts-ignore
    const user: UserModel = {
      email: email,
      id: uid,
      picture: picture,
      username: name
    }
    return this.afs.collection(this.collectionName).doc(uid).update(user);
  }
  //DELETE

  updateUserNameAndEmailDB(user: UserModel){
    return this.afs.collection(this.collectionName).doc(user.id).update(user);
  }

  updateUserCoins(id: string){
    let coins = parseInt(localStorage.getItem('coins') as string);
    coins += 1;
    console.log("user coind"+ coins)
    // @ts-ignore
    localStorage.setItem('coins', String(coins));
    return this.afs.collection(this.collectionName).doc(id).update({coins: coins});
  }

}
