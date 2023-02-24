import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, tap, throwError } from 'rxjs';
import { IPokemon } from "./api";


@Injectable( { providedIn: 'root' })
export class FetchdataService {

  private url: string = "https://pokeapi.co/api/v2/pokemon/";
  private header = new HttpHeaders();

  private _http;

  constructor(http: HttpClient) { 
    this._http = http;
  }

  getPokemon(id: number): Observable<IPokemon> {
    this.header.append('Content-Type', 'application/json');
    return this._http.get<IPokemon>(this.url + id, { headers: this.header })
      .pipe(
        //tap(data => console.log('THE POKEMON NUMBER: ' + id + " WITH THE DATA: " + JSON.stringify(data))),
        tap(data => console.log(this.url + id)),
        catchError(this.handleError)
      );
  }

  getAllPokemon(numPokemons: number): Observable<IPokemon>[] {
    this.header.append('Content-Type', 'application/json');

    const pokemonArray: Observable<IPokemon>[] = [];

    for (let i = 1; i < numPokemons; i++) {
      pokemonArray.push(
        this._http.get<IPokemon>(this.url + i, { headers: this.header })
        .pipe(
          tap(data => console.log("Pokemon Number: " + i)), 
          catchError(this.handleError) )
      );
    }

    return pokemonArray;
  }


  private handleError(err: HttpErrorResponse) {
    let errorMessage = '';
    if (err.error instanceof ErrorEvent) {
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      errorMessage = `Server returned code: ${err.status}, error message is: ${err.message}`;
    }
    console.error(errorMessage);
    return throwError(errorMessage);
  }
}
