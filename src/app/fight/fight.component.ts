import { Component, OnInit, OnDestroy } from '@angular/core';
import { areas, pokemon } from "../data/pokemon.constants";



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
	onSelected(value:string): void {
		this.selectedArea = value;
    this.areaIndex = this.areas.indexOf(value);

	}
  async ngOnInit(): Promise<void> {


  }

  async ngOnDestroy(): Promise<void> {

}
}