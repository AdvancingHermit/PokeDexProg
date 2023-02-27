import { Component, OnInit, OnDestroy } from '@angular/core';
import { IPokemon, pokeSprites } from '../fetchdata/api';
import { generate, Subscription } from 'rxjs';
import { PokemonClient } from 'pokenode-ts';
import { areas, pokemon } from "../data/pokemon.constants";

async function getPokemon(inputIDs: number[]) {
  let pokemonArray: IPokemon[] = [];
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
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
  providers: []
})

export class SearchComponent implements OnInit, OnDestroy {

  searchTerm = '';
  error: string = "";
  sub: Subscription | undefined;
  pokeArr: IPokemon[] = [];
  pokeSearch: IPokemon[] = [];
  testSprite!: pokeSprites;
  
  pokemonArea(poke: IPokemon): string {

    return areas[pokemon.findIndex((elem) => elem.indexOf(poke.id) > -1)]
  }

  async ngOnInit(): Promise<void> {
    let idArr: number[] = [];
    getPokemon(idArr.concat(pokemon[0], pokemon[1], pokemon[2], pokemon[3], pokemon[4])).then((data) => this.pokeArr = data);
  }

  async ngOnDestroy(): Promise<void> {
    this.sub?.unsubscribe();
  }

  search(value: string): void {
    this.pokeSearch = this.pokeArr.filter((val) =>
      val.name.toLowerCase().includes(value)
    );
  }

}