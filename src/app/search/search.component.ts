import { Component, OnInit, OnDestroy } from '@angular/core';
import { IPokemon } from '../fetchdata/api';
import { generate, Subscription } from 'rxjs';
import { PokemonClient } from 'pokenode-ts';
let pokemonArray: string[] = [];


(async () => {

  for (let i = 1; i < 151; i++) {
    const api = new PokemonClient();

    await api
      .getPokemonById(i)
      .then((data) => pokemonArray[i - 1] = (data.name)) 
      .catch((error) => console.error(error));
  }
  //console.log(pokemonArray);
})();

function generatePokemon(): string[] {
  return pokemonArray;
}



@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
  providers: []
})

export class SearchComponent implements OnInit, OnDestroy {

  error: string = "";
  sub: Subscription | undefined;
  pokeArr: string[] = generatePokemon();


  clickFunction() {
    console.log("Length is: " + this.pokeArr.length);
  }

  async ngOnInit(): Promise<void> {

    for (let i = 0; i < pokemonArray.length; i++) {
      pokemonArray[i] = pokemonArray[i].charAt(0).toUpperCase() + pokemonArray[i].slice(1);
      this.pokeArr[i] = pokemonArray[i];
    }
  }



  async ngOnDestroy(): Promise<void> {
    this.sub?.unsubscribe();
  }

}
