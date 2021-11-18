import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RestaurantsRoutingModule } from './restaurants-routing.module';
import { SharedModule } from '@shared/shared.module';

import { RestRegistrationComponent, RestAddMenuComponent, RestMenuListComponent, StarRatingComponent, RestListComponent } from './components';
import { RestaurantsService } from './services';

const MODULES = [
  CommonModule,
  RestaurantsRoutingModule,
  SharedModule
];
const COMPONENTS = [RestRegistrationComponent, RestAddMenuComponent, RestMenuListComponent, StarRatingComponent, RestListComponent]

@NgModule({
  declarations: [...COMPONENTS],
  imports: [
    ...MODULES
  ],
  exports: [...MODULES],
  providers: [RestaurantsService]
})
export class RestaurantsModule { }
