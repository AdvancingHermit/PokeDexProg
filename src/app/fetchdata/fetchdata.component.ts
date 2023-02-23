import { Component, OnInit, OnDestroy } from '@angular/core';
import { FetchdataService } from './fetchdata.service';
import { IPokemon } from './api';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-fetchdata',
  templateUrl: './fetchdata.component.html',
  styleUrls: ['./fetchdata.component.css'],
  providers: [FetchdataService]
})
export class FetchdataComponent implements OnInit, OnDestroy {

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
