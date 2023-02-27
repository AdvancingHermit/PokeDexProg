import { Component, OnInit, OnDestroy } from '@angular/core';
import { DataService } from "../data/data.service";
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {
  users: any;
  sub: Subscription | undefined;
  constructor(private data: DataService) { }
  ownedIDs: number[] = [];


  saveDataTest(userNameGot: string, passwordGot: string) {
    let dataTest: any = localStorage.getItem("userNameGot");
    

    if (dataTest == undefined) {
    
      let data: any = { password: passwordGot, IDs: [1, 2, 7, 8] };
      localStorage.setItem(userNameGot, JSON.stringify(data));
      this.data.changeMons(data.IDs);
      this.data.changeUserName(userNameGot);
      alert(this.data.userName + " Has now been registered");

      let dataTwo: any = { userName: userNameGot };
      localStorage.setItem("CurrentUser", JSON.stringify(dataTwo));
      location.href = "/";
      
    } else {
      this.users = JSON.parse(dataTest);
      if (this.users.password == (passwordGot)) {
        this.data.changeMons(this.users.IDs);
        this.data.changeUserName(this.users.userName);
        alert("User already exists");

        let dataTwo: any = { userName: userNameGot };
        localStorage.setItem("CurrentUser", JSON.stringify(dataTwo));
        location.href = "/";

      } else { alert("Password is incorrect"); }

    }
  }

  async ngOnInit(): Promise<void> {
    this.sub = this.data.currentMons.subscribe(ownedIDs => this.ownedIDs = ownedIDs)
  }

  async ngOnDestroy(): Promise<void> {
    this.sub?.unsubscribe();
  }

}
