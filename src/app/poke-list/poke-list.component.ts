import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { generate, Subscription } from 'rxjs';
import { PokemonClient, Pokemon } from 'pokenode-ts';
import { areas, pokemon } from "../data/pokemon.constants";


async function getPokemon(inputIDs: number[]) {
  let pokemonArray: Pokemon[] = [];
  for (let i = 0; i < inputIDs.length; i++) {
    const api = new PokemonClient();

    await api
      .getPokemonById(inputIDs[i])
      .then((data) => {pokemonArray[i] = (data)}) 
      .catch((error) => console.error(error));
  }
  console.log(pokemonArray);
  return pokemonArray;
}


@Component({
  selector: 'app-poke-list',
  templateUrl: './poke-list.component.html',
  styleUrls: ['./poke-list.component.css']
})

export class PokeListComponent implements OnInit, OnDestroy {

  error: string = "";
  sub: Subscription | undefined;
  pokeArr: Pokemon[] = [];
  stats: string[][] = [[]];
  areas = areas;
  pokemon = pokemon;
  @Input() inputIDs: number[] = [];
  
  constructor() { }

  async ngOnInit(): Promise<void> {
    getPokemon(this.inputIDs).then((data) => this.pokeArr = data);
  }
  ngOnChanges(): void {
    getPokemon(this.inputIDs).then((data) => this.pokeArr = data);
  }



  async ngOnDestroy(): Promise<void> {
    this.sub?.unsubscribe();
  }
}