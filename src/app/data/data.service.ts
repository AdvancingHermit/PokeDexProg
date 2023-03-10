import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class DataService {
  ownedIDs: number[] = [1, 4, 7];
  private idSource = new BehaviorSubject(this.ownedIDs);
  currentMons = this.idSource.asObservable();
  userName = this.getName();
  userStore: any;


  constructor() { }

  updateOwnedIDs(){
    let dataUser: any = localStorage.getItem("CurrentUser");
    if (dataUser != undefined) {
      this.userStore = JSON.parse(dataUser);
      let dataSecond: any = localStorage.getItem(this.userStore.userName);
      this.userStore = JSON.parse(dataSecond);
      this.ownedIDs = this.userStore.IDs;
      this.changeMons(this.ownedIDs);

    }
  }

  changeOwnedIds(iD: number){
    let dataUser: any = localStorage.getItem("CurrentUser");
    if (dataUser != undefined) {
      this.userStore = JSON.parse(dataUser);
      let dataSecond: any = localStorage.getItem(this.userStore.userName);
      this.userStore = JSON.parse(dataSecond);
      if (this.ownedIDs.includes(iD) == false) {
        this.ownedIDs.push(iD);
        let dataForChange: any = { password: this.userStore.password, IDs: this.ownedIDs };
        localStorage.setItem(this.userName, JSON.stringify(dataForChange));
      }

    }
  }

  getName(): string {
    let userStName: string = "";
    let dataUser: any = localStorage.getItem("CurrentUser");
    if (dataUser != undefined) {
      this.userStore = JSON.parse(dataUser);
      userStName = this.userStore.userName;
    } else {
      console.log(location.href);
      if (location.href != "http://localhost:4200/login")
        location.href = "/login";
    }
    this.updateOwnedIDs()
    return userStName;
  }
  changeMons(ownedIDs: number[]) {
    this.idSource.next(ownedIDs)
    console.log(this.idSource);
  }
  changeUserName(userName: string) {
    this.userName = userName;
  } getUserName() {
    this.getName();
    return this.userName;
  }


}