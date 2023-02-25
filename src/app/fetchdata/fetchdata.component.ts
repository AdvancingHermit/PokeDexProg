import { Component, OnInit, OnDestroy } from '@angular/core';
import { FetchdataService } from './fetchdata.service';
import { IPokemon, IPokemonArray } from './api';
import { Subscription } from 'rxjs';
let amount: number = 10;

@Component({
  selector: 'app-fetchdata',
  templateUrl: './fetchdata.component.html',
  styleUrls: ['./fetchdata.component.css'],
  providers: [FetchdataService]
})
export class FetchdataComponent implements OnInit, OnDestroy {

  pokemon!: IPokemon;
  pokemonArray!: IPokemonArray;
  pokeTestArray!: IPokemon[];
  error: string = "";
  sub: Subscription | undefined;

  constructor(private fetchdataService: FetchdataService){}

  ngOnInit(): void {
    this.sub = this.fetchdataService.getPokemonArray(amount).subscribe({
      next: x => this.pokemonArray = x,
      error: err => this.error = err
    });

    console.log(this.pokemonArray);
  }

  clickFunction() {

    alert(this.pokemonArray);
    console.log("Length is: " + this.pokemonArray);
    console.log(this.pokemonArray.results);

  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }

}
