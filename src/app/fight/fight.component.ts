import { Component, OnInit, OnDestroy,  ViewChild, AfterViewInit } from '@angular/core';
import { areas, pokemon } from "../data/pokemon.constants";
import { DataService } from "../data/data.service";
import {  Subscription } from 'rxjs';
import { PokemonClient, Pokemon } from 'pokenode-ts';


async function getFightingPokemon(inputIDs: number[]): Promise<Pokemon[]> {
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
  selector: 'app-fight',
  templateUrl: './fight.component.html',
  styleUrls: ['./fight.component.css']
})
export class FightComponent implements OnInit, OnDestroy, AfterViewInit {
	selectedArea = 'Grassy Plains';
  areas = areas;
  pokemon = pokemon;
  areaIndex = 0;
  sub: Subscription | undefined;
  stage = 0;
  chosen: number = 1;
  enemy: number = 1;
  chosenPokemon: Pokemon[] = [] ;
  enemyPokemon: Pokemon[] = [] ;
  winnerPokemon: Pokemon[] = [] ;
  loserPokemon: Pokemon[] = [] ;
  winnerName?: string;
  loserName?: string;
  enemyMaxHP: number = 0;
  ownedIDs: number[] = [];
  done: boolean = true;

	onSelected(value:string): void {
		this.selectedArea = value;
    this.areaIndex = this.areas.indexOf(value);
	}
  constructor(private data: DataService) { }

  ngAfterViewInit(): void {
  }

  async ngOnInit(): Promise<void> {
    this.sub = this.data.currentMons.subscribe(ownedIDs => this.ownedIDs = ownedIDs)
    await getFightingPokemon([this.chosen, this.enemy]).then((data) =>{ this.chosenPokemon = [data[0]]; this.enemyPokemon = [data[1]]});
  }

  async ngOnDestroy(): Promise<void> {
    this.sub?.unsubscribe();
  }
  async addPokemon(): Promise<void> {
    this.ownedIDs.push(this.enemy);
    this.data.changeMons(this.ownedIDs);
    console.log(this.ownedIDs);
    console.log(this.data.currentMons);
  }
  async nextStage(): Promise<void> {
    switch(this.stage) {
      case 0:
        document.getElementById("stage 1")!.remove();
        document.getElementById("stage 2")!.style.display = "block";
        this.enemy = this.pokemon[this.areaIndex][Math.floor(Math.random() * this.pokemon[this.areaIndex].length)];
        this.stage++;
        break;
      case 1:
        document.getElementById("stage 2")!.remove()
        document.getElementById("stage 3")!.style.display = "block";
        console.log(this.chosen);
        this.stage++;
        await getFightingPokemon([this.chosen, this.enemy]).then((data) => {this.chosenPokemon = [data[0]]; this.enemyPokemon =[data[1]];});
        this.enemyMaxHP = this.enemyPokemon[0].stats[0].base_stat;
        break;
      case 2:
        document.getElementById("stage 3")!.remove()
        document.getElementById("stage 4")!.style.display = "block";
        break;
      case 3:
        document.getElementById("stage 3")!.remove()
        document.getElementById("stage 4")!.remove()
        document.getElementById("stage 5")!.style.display = "block";
        await this.addPokemon();
        break;
        
    }
  }
  submittedPokemon(): void {
    let id: number = +document.getElementsByClassName("selected")[0].id.split(" ")[1];
    this.chosen = this.ownedIDs[id];
    this.nextStage();
  }
  damage(poke: Pokemon, enem: Pokemon): boolean {
    console.log("damaging");
    let damage: number = Math.floor((poke.stats[1].base_stat / enem.stats[2].base_stat) * 20.0 * (Math.random() * (0.8 - 1.2) + 0.8));
    enem.stats[0].base_stat -= damage;
    if (enem.stats[0].base_stat <= 0) {
      console.log("dead");
      enem.stats[0].base_stat = 0;
      this.winnerPokemon = [poke];
      this.loserPokemon = [enem];
      this.winnerName = poke.name;
      this.loserName = enem.name;
      this.nextStage();
      return true;
    }
    return false
  }
  attack(): void {
    let won: boolean = false;
    console.log("fighting");
    if (this.done) {
      won = this.damage(this.chosenPokemon[0], this.enemyPokemon[0]);
    }
    if (!won && this.done) {
      this.done = false;
        setTimeout(() => {this.damage(this.enemyPokemon[0], this.chosenPokemon[0]); this.done = true}, 1000);
    }
  }

  attemptCatch(): void {
    console.log("attempting to catch");
    
    let n = Math.random()*255;
    let f = (this.enemyMaxHP * 255*4) / (this.enemyPokemon[0].stats[0].base_stat * 20);
    if (n < f) {
      console.log("caught");
      this.stage = 3;
      this.loserPokemon = [this.enemyPokemon[0]];
      this.loserName = this.enemyPokemon[0].name;
      this.nextStage();
    } else {
      setTimeout(() => {this.damage(this.enemyPokemon[0], this.chosenPokemon[0]);}, 800);
    }

  }
}
