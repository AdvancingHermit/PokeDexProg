import { Component, OnInit, OnDestroy } from '@angular/core';
import { IPokemon } from '../fetchdata/api';
import { DataService } from "../data/data.service";
import {  Subscription } from 'rxjs';
import {Pokemon } from 'pokenode-ts';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.css']
})

export class InventoryComponent implements OnInit, OnDestroy {

  error: string = "";
  sub: Subscription | undefined;
  pokeArr: Pokemon[] = [];
  stats: string[][] = [[]];
  ownedIDs: number[] = [];
  
  constructor(private data: DataService) { }

  async ngOnInit(): Promise<void> {
    console.log(this.stats);
    this.sub = this.data.currentMons.subscribe(ownedIDs => this.ownedIDs = ownedIDs)
  }

  async ngOnDestroy(): Promise<void> {
    this.sub?.unsubscribe();
  }
}