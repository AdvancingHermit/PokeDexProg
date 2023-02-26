import { Component, OnInit, OnDestroy } from '@angular/core';
import { IPokemon } from '../fetchdata/api';
import { DataService } from "../data/data.service";
import { Subscription } from 'rxjs';
import {Pokemon } from 'pokenode-ts';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  users: any;

  saveData() {
    let data = {userName : "testUser", password: 'Pikachu', pokemon: []};

    localStorage.setItem('users', JSON.stringify(data));
  }
  loadData() {
    let data: any = localStorage.getItem('users');
    console.log(data);
    this.users = JSON.parse(data);
  }

  async ngOnInit(): Promise<void> {
    console.log(this.stats);
    this.sub = this.data.currentMons.subscribe(ownedIDs => this.ownedIDs = ownedIDs)
  }

  async ngOnDestroy(): Promise<void> {
    this.sub?.unsubscribe();
  }

}
