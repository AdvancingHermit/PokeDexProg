import { Component, OnInit, OnDestroy } from '@angular/core';
import { IPokemon } from '../fetchdata/api';
import { DataService } from "../data/data.service";
import { Subscription } from 'rxjs';
import { Pokemon } from 'pokenode-ts';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  users: any;
  sub: Subscription | undefined;
  constructor(private data: DataService) { }
  ownedIDs: number[] = [];


  saveDataTest(userNameGot: string, passwordGot: string) {
    let dataTest: any = localStorage.getItem(userNameGot);

    if (dataTest == undefined) {
    
      let data: any = { password: (passwordGot), IDs: [1, 2, 7, 8] };

      localStorage.setItem(userNameGot, JSON.stringify(data));

      console.log(data);
      this.users = data;

      this.data.changeMons(this.users.IDs);
      this.data.changeUserName(this.users.userName);
      console.log(this.users.password);

    } else {

      this.users = JSON.parse(dataTest);
;
      if (this.users.password == (passwordGot)) {
        this.data.changeMons(this.users.IDs);
        this.data.changeUserName(this.users.userName);
        alert("Username already exists" + this.data.currentMons);
      } else {
        alert("Password is incorrect");
      }

    }
  }

  saveData() {
    let data = { userName: "testUser", password: 'Pikachu', IDs: [1, 2, 7, 8] };

    localStorage.setItem('user', JSON.stringify(data));
  }
  loadData() {

    let data: any = localStorage.getItem('users');

    console.log(data);
    this.users = JSON.parse(data);

    this.data.changeMons(this.users.IDs);
    this.data.changeUserName(this.users.userName);
    console.log(this.data.currentMons);
  }

  async ngOnInit(): Promise<void> {
    this.sub = this.data.currentMons.subscribe(ownedIDs => this.ownedIDs = ownedIDs)
  }

  async ngOnDestroy(): Promise<void> {
    this.sub?.unsubscribe();
  }

}
