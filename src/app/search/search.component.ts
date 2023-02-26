import { Component, OnInit, OnDestroy } from '@angular/core';
import { IPokemon, pokeSprites } from '../fetchdata/api';
import { generate, Subscription } from 'rxjs';
import { PokemonClient } from 'pokenode-ts';
let pokemonArray: string[] = [];
let pokeTestArray: IPokemon[] = [];


(async () => {

  for (let i = 1; i < 151; i++) {
    const api = new PokemonClient();

    await api
      .getPokemonById(i)
      .then((data) => pokeTestArray[i - 1] = (data)) // will output "Luxray"
      .catch((error) => console.error(error));
  }
  console.log(pokeTestArray);
})();

function generatePokemon(): IPokemon[] {
  return pokeTestArray;
}


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
  providers: []
})

export class SearchComponent implements OnInit, OnDestroy {

  searchTerm = '';
  term = '';

  error: string = "";
  sub: Subscription | undefined;
  pokeArr: IPokemon[] = generatePokemon();
  pokeTestSearch: IPokemon[] = [];
  testSprite!: pokeSprites;
  url: string = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/";

  clickFunction() {

    alert(pokeTestArray.length + " This is The other one " + this.pokeArr.length);

    this.convertSprites();

  }
  getImage(id: number): string{
    return this.url + id + ".png";
  }

  async ngOnInit(): Promise<void> {

    for (let i = 0; i < pokeTestArray.length; i++) {
      this.pokeArr[i] = pokeTestArray[i];

    }
    console.log("I AM DONE FIRST TEST");
  }

  convertSprites() {
    for (let i = 0; i < pokeTestArray.length; i++) {

      this.testSprite = JSON.parse(JSON.stringify(pokeTestArray[i].sprites));
      pokeTestArray[i].sprites = this.testSprite;
      console.log(this.testSprite.front_default);

    }
  }



  async ngOnDestroy(): Promise<void> {
    this.sub?.unsubscribe();
  }

  search(value: string): void {
    this.pokeTestSearch = this.pokeArr.filter((val) =>
      val.name.toLowerCase().includes(value)
    );
  }

}