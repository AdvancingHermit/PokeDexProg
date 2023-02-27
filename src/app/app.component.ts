import { Component, OnInit, OnDestroy } from '@angular/core';
import { DataService } from "./data/data.service";
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  sub: Subscription | undefined;
  constructor(private data: DataService) { }
  title = 'test';
  userName = "";




  onLogin(user: string) {
    this.userName = user;
  }


  async ngOnInit(): Promise<void> {
    this.userName = this.data.getUserName();
    console.log(this.userName);
  }

  async ngOnDestroy(): Promise<void> {
    this.sub?.unsubscribe();
  }
}
