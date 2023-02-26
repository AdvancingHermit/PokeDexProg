import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SearchComponent } from './search/search.component';
import { InventoryComponent } from './inventory/inventory.component';
import { FightComponent } from './fight/fight.component';
import { FetchdataComponent } from './fetchdata/fetchdata.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  { path: 'search', component: SearchComponent },
  { path: 'inventory', component: InventoryComponent },
  { path: 'fight', component: FightComponent },
  { path: 'fetchdata', component: FetchdataComponent },
  { path: 'login', component: LoginComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
