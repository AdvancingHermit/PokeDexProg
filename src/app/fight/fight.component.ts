import { Component, OnInit, OnDestroy } from '@angular/core';
import { areas, pokemon } from "../data/pokemon.constants";
import { DataService } from "../data/data.service";
import {  Subscription } from 'rxjs';

@Component({
  selector: 'app-fight',
  templateUrl: './fight.component.html',
  styleUrls: ['./fight.component.css']
})
export class FightComponent implements OnInit, OnDestroy {
	selectedArea = 'Grassy Plains';
  areas = areas;
  pokemon = pokemon;
  areaIndex = 0;
  sub: Subscription | undefined;
  stage = 0;

	onSelected(value:string): void {
		this.selectedArea = value;
    this.areaIndex = this.areas.indexOf(value);

	}
  ownedIDs: number[] = [];
  
  constructor(private data: DataService) { }

  async ngOnInit(): Promise<void> {
    this.sub = this.data.currentMons.subscribe(ownedIDs => this.ownedIDs = ownedIDs)
  }

  async ngOnDestroy(): Promise<void> {
    this.sub?.unsubscribe();
  }
  nextStage(): void {
    switch(this.stage) {
      case 0:
        document.getElementById("stage 1")!.style.display = "none";
        document.getElementById("stage 1")!.remove();
        document.getElementById("stage 2")!.style.display = "block";
        this.stage++;
        break;
      case 1:
        document.getElementById("stage 2")!.style.display = "none";
        document.getElementById("stage 3")!.style.display = "block";
        this.stage++;
        break;
    }
  }
}