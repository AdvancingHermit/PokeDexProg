import { Component, OnInit, OnDestroy } from '@angular/core';
import { IPokemon } from '../fetchdata/api';
import { generate, Subscription } from 'rxjs';
import { PokemonClient, Pokemon } from 'pokenode-ts';
import { getSafePropertyAccessString } from '@angular/compiler';
import { DataService } from "../data/data.service";
import {  Subscription } from 'rxjs';
import {Pokemon } from 'pokenode-ts';


// array of pokemon ids 1 to 100 for testing
let ownedIDs: number[] = [].constructor(100).fill(0).map((x: number, y: number) => y + 1);


async function getPokemon() {
  let pokemonArray: Pokemon[] = [];
  for (let i = 0; i < ownedIDs.length; i++) {
    const api = new PokemonClient();

    await api
      .getPokemonById(ownedIDs[i])
      .then((data) => {pokemonArray[i] = (data)}) 
      .catch((error) => console.error(error));
  }
  console.log(pokemonArray);
  return pokemonArray;
}

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