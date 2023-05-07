import {Injectable} from '@angular/core';
import {AngularFirestore} from '@angular/fire/compat/firestore';
import {PotholeModel} from "../model/PotholeModel";
import {query, where} from "@angular/fire/firestore";

@Injectable({
  providedIn: 'root'
})
export class PotServService {
  user: any;

  constructor(private afs: AngularFirestore) {
    this.user = JSON.parse(localStorage.getItem('user') as string);
  }

  collectionName = 'pothole';

  //CREATE
  savePothole(pothole: PotholeModel) {

    const uid = this.afs.createId();
    pothole.id = uid;
    pothole.userid = this.user['uid'];
    pothole.fixed = false;
    return this.afs.collection(this.collectionName).doc(uid).set(pothole);
  }

  //READ
  getAllUnFixed() {
    const q = query
    return this.afs.collection<PotholeModel>(this.collectionName, ref => ref.where("fixed","==",false)).valueChanges();
  }
  getAllFixed() {
    const q = query
    return this.afs.collection<PotholeModel>(this.collectionName, ref => ref.where("fixed","==",true)).valueChanges();
  }

  getPotholeById(id: string) {
    return this.afs.collection<PotholeModel>(this.collectionName).doc(id).valueChanges();
  }

  //TODO: kátyúk CRUD műveleteit befejezni
  //UPDATE
  update(id: string, data: PotholeModel) {
    console.log(id);
    return this.afs.collection(this.collectionName).doc(id).update(data);
    // return id;
  }

  fixePothole(id: string){
    return this.afs.collection(this.collectionName).doc(id).update({fixed: true});
  }

  //DELETE
  delete(id: string) {
    this.afs.collection(this.collectionName ).doc(id).delete();
  }
}
