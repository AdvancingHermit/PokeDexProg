import { Component, OnInit, OnDestroy } from '@angular/core';
import { IPokemon } from '../fetchdata/api';
import { Subscription } from 'rxjs';
import { PokemonClient } from 'pokenode-ts';
let pokemonArray: string[] = [];


(async () => {
  
  for (let i = 1; i < 10; i++) {
  const api = new PokemonClient();

  await api
    .getPokemonById(i)
    .then((data) => pokemonArray[i - 1] = (data.name)) // will output "Luxray"
    .catch((error) => console.error(error));
  }
  console.log(pokemonArray);
})();



@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
  providers: []
})

export class SearchComponent implements OnInit, OnDestroy {

  error: string = "";
  sub: Subscription | undefined;
  pokeArr = pokemonArray;

  async ngOnInit(): Promise<void> {

    console.log("I AM DONE FIRST TEST");
  }



  async ngOnDestroy(): Promise<void> {
    this.sub?.unsubscribe();
  }

}
