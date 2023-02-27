import { Component, OnInit, OnDestroy, Input, Output, EventEmitter } from '@angular/core';
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
  @Input() chooseable: boolean = false;
  @Output() chosenPokemon = new EventEmitter<number>();

  chosen: number = -1;
  constructor() { }

  async ngOnInit(): Promise<void> {
    getPokemon(this.inputIDs).then((data) => this.pokeArr = data);
    if (this.chooseable){
      document.getElementById("select pokemon")!.innerHTML = '<button class="next" (click)="submitPokemon()"> Next </button>';
    }

  }
  ngOnChanges(): void {
    getPokemon(this.inputIDs).then((data) => this.pokeArr = data);
  }
  pokemonArea(poke: Pokemon): string {

    return areas[pokemon.findIndex((elem) => elem.indexOf(poke.id) > -1)]
  }
  selectPokemon(id: number): void {
    if (this.chooseable) {
      document.getElementById("pokemon " + id)!.style.background = "rgb(15, 251, 5)";

      if (this.chosen != -1)
          document.getElementById("pokemon " + this.chosen)!.style.background = "white";
      this.chosen = id;
    }
  }
  submitPokemon(): void {
    this.chosenPokemon.emit(this.chosen)
  }
  async ngOnDestroy(): Promise<void> {
    this.sub?.unsubscribe();
  }
}