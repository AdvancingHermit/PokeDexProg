import { Component, OnInit, OnDestroy, Input, AfterViewInit} from '@angular/core';
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

})

export class PokeListComponent implements OnInit, OnDestroy {

  error: string = "";
  sub: Subscription | undefined;
  pokeArr: Pokemon[] = [];
  stats: string[][] = [[]];
  areas = areas;
  pokemon = pokemon;
  @Input() inputIDs: number[] = [];
  @Input() inputPokemon: Pokemon[] = [];
  @Input() chooseable: boolean = false;
  @Input() fight: boolean = false;

  chosen: number = -1;
  constructor() { }

  async ngOnInit(): Promise<void> {
    if (this.fight) {
      this.pokeArr = this.inputPokemon;
      console.log(this.pokeArr);
    }
    else{
      getPokemon(this.inputIDs).then((data) => this.pokeArr = data);
    }
  }
  ngOnChanges(): void {
    if (this.fight) {
      this.pokeArr = this.inputPokemon;
    }
    else{
      getPokemon(this.inputIDs).then((data) => this.pokeArr = data);
    }
  }
  pokemonArea(poke: Pokemon): string {

    return areas[pokemon.findIndex((elem) => elem.indexOf(poke.id) > -1)]
  }
  selectPokemon(id: number): void {
    if (this.chooseable) {
      document.getElementById("pokemon " + id)!.style.background = "rgb(15, 251, 5)";
      document.getElementById("pokemon " + id)!.classList.add("selected");

      if (this.chosen != -1 && this.chosen != id){
          document.getElementById("pokemon " + this.chosen)!.style.background = "white";
          document.getElementById("pokemon " + this.chosen)!.classList.remove("selected");
      }
      this.chosen = id;
    }
  }
  async ngOnDestroy(): Promise<void> {
    this.sub?.unsubscribe();
  }
}