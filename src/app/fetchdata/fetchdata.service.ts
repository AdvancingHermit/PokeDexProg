import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, tap, throwError } from 'rxjs';
import { IPokemon, IPokemonArray } from "./api";


@Injectable( { providedIn: 'root' })
export class FetchdataService {

  private url: string = "https://pokeapi.co/api/v2/pokemon/";
  private urlTwo: string = "https://pokeapi.co/api/v2/pokemon?limit=";
  private header = new HttpHeaders();

  private _http;

  constructor(http: HttpClient) { 
    this._http = http;
  }

  getPokemon(id: number): Observable<IPokemon> {
    this.header.append('Content-Type', 'application/json');
    return this._http.get<IPokemon>(this.url + id, { headers: this.header })
      .pipe(
        tap(data => console.log(this.url + id)),
        catchError(this.handleError)
      );
  }

  getPokemonArray(amount: number): Observable<IPokemonArray> {
    this.header.append('Content-Type', 'application/json');
    return this._http.get<IPokemonArray>(this.urlTwo + amount, { headers: this.header })
      .pipe(
        tap(data => console.log('All: ' + JSON.stringify(data))),
        catchError(this.handleError)
      );
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
