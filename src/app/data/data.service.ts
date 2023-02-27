import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class DataService {
  ownedIDs: number[] = [23, 27, 50, 84, 104, 111, 140, 322, 328, 331, 41, 74, 95, 138, 204, 246, 299, 304, 337, 338];
  private idSource = new BehaviorSubject(this.ownedIDs);
  currentMons = this.idSource.asObservable();
  userName = this.getName();
  userStore: any;


  constructor() { }

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
    return userStName;
  }
  changeMons(ownedIDs: number[]) {
    this.idSource.next(ownedIDs)
  }
  changeUserName(userName: string) {
    this.userName = userName;
  } getUserName() {
    this.getName();
    console.log(this.userName);
    return this.userName;
  }

}