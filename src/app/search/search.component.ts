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
    .then((data) => pokemonArray[i - 1] = (data.name)) // will output "Luxray"
    .catch((error) => console.error(error));
  }
  console.log(pokemonArray);
})();

function generatePokemon(): string[] {
  for (let i = 0; i < pokemonArray.length; i++) {
    console.log(pokemonArray[i]);
  }
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
    
    alert(pokemonArray.length + " This is The other one " + this.pokeArr.length);

    for (let i = 0; i < pokemonArray.length; i++) {
      console.log("Length is: " + this.pokeArr.length);
    }
    alert("I AM DONE");

    
  }

  async ngOnInit(): Promise<void> {
    
  for (let i = 0; i < pokemonArray.length; i++) {
    this.pokeArr[i] = pokemonArray[i];
  }

    console.log("I AM DONE FIRST TEST");
  }



  async ngOnDestroy(): Promise<void> {
    this.sub?.unsubscribe();
  }

}
