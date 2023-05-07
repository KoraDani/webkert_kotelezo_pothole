import { Component, OnInit, ViewChild} from '@angular/core';
import {PotServService} from "../../shared/services/pot-serv.service";
import {PotholeModel} from "../../shared/model/PotholeModel";
import {AuthServService} from "../../shared/services/auth-serv.service";
import { MatPaginator } from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {LogServService} from "../../shared/services/log-serv.service";
import {UserModel} from "../../shared/model/UserModel";

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  displayedColumns: Array<string> = [/*'id',*/'orszag', 'varos', 'cim', /*'hazszam',*/ 'karNagysaga', 'muvelet'];
  potList: MatTableDataSource<PotholeModel> | any;
  pageSize = 5;
  pageIndex = 0;
  user?: UserModel;
  @ViewChild(MatPaginator) paginator?: MatPaginator;
  @ViewChild(MatSort) sort?: MatSort;

  constructor(private potService: PotServService, private auth: AuthServService, private logserv: LogServService) {  }

  ngOnInit(): void {
    this.potService.getAllUnFixed().subscribe(potl => {
      this.potList = new MatTableDataSource(potl);
      this.potList.paginator = this.paginator;
      this.potList.sort = this.sort;
      // @ts-ignore
      this.paginator.pageSize = this.pageSize;
      // @ts-ignore
      this.paginator.pageIndex = this.pageIndex;
    });
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.potList.filter = filterValue.trim().toLowerCase();

    if (this.potList.paginator) {
      this.potList.paginator.firstPage();
    }
  }

  deletePothole(data: string) {
    this.potService.delete(data);
  }

  UserLoggedIn() {
    return localStorage.getItem('user') == 'null';
  }

  fixeHole(id: string, uid: string) {
    console.log("user id:" + uid);
    this.potService.fixePothole(id).catch(()=>{
      console.log("sikeres");
    }).catch(error=>{
      console.error(error);
    });
    this.logserv.updateUserCoins(uid).catch(() =>{
      console.log("sikeres");
    }).catch(error =>{
      console.error(error);
    });

  }

}
