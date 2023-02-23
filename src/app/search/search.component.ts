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
export class SearchComponent {
  pokemon!: IPokemon;
  error: string = "";
  sub: Subscription | undefined;

  constructor(private fetchdataService: FetchdataService){}

  ngOnInit(): void {
    this.sub = this.fetchdataService.getPokemon(1).subscribe({
      next: x => this.pokemon = x,
      error: err => this.error = err
    });
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }

}