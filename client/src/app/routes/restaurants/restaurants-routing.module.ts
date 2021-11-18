import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RestRegistrationComponent, RestAddMenuComponent, RestMenuListComponent, RestListComponent } from './components';
const routes: Routes = [
  { path: 'registration', component: RestRegistrationComponent, data: { title: 'Add Restaurant' } },
  { path: 'add-menu', component: RestAddMenuComponent, data: { title: 'Add Menu' } },
  { path: 'menu-list', component: RestMenuListComponent, data: { title: 'List menu' } },
  { path: 'rest-list', component: RestListComponent, data: { title: 'List Restaurant' } }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RestaurantsRoutingModule { }
