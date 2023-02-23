import { Component, OnInit, OnDestroy } from '@angular/core';
import { FetchdataService } from '../fetchdata/fetchdata.service';
import { IPokemon } from '../fetchdata/api';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
  providers: [FetchdataService]
})

export class SearchComponent implements OnInit, OnDestroy {
  pokemon!: IPokemon;
  pokemonArray: IPokemon[] = [];
  error: string = "";
  sub: Subscription | undefined;

  constructor(private fetchdataService: FetchdataService) { }

  ngOnInit(): void {
    for(let i: number = 1; i < 6; i++){
      console.log("ID Number: " + i );
      this.sub = this.fetchdataService.getPokemon(i).subscribe({

        next: x => this.pokemon = x,
        error: err => this.error = err
  
      });
      console.log("Pokemon: " + this.pokemon);
    }

    console.log("I AM DONE FIRST TEST");
    /*

    this.sub = this.fetchdataService.getPokemon(1).subscribe({

      next: x => this.pokemon = x,
      error: err => this.error = err

    });
  
    for (let i = 1; i < 151; i++) {
      this.GetAllPokemon(i);
    }
    */
  }

  GetAllPokemon(id: number): IPokemon[] {
    console.log("ID Number: " + id );
    this.sub = this.fetchdataService.getPokemon(id).subscribe({
      
      next: x => this.pokemon = x,
      error: err => this.error = err

    });
    console.log("Pokemon: " + this.pokemon);
    let ThePokemonName = this.pokemon;
    this.pokemonArray.push(ThePokemonName);
    console.log(ThePokemonName);
    return this.pokemonArray;
  }


  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }

}
