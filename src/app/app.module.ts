import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SearchComponent } from './search/search.component';
import { FightComponent } from './fight/fight.component';
import { InventoryComponent } from './inventory/inventory.component';
import { FetchdataComponent } from './fetchdata/fetchdata.component';
import { HttpClientModule } from '@angular/common/http';
import { PokeListComponent } from './poke-list/poke-list.component';


@NgModule({
  declarations: [
    AppComponent,
    SearchComponent,
    FightComponent,
    InventoryComponent,
    FetchdataComponent,
    PokeListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
