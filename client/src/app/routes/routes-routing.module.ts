import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { environment } from '@env/environment';

import { AdminLayoutComponent } from '../theme/admin-layout/admin-layout.component';

const routes: Routes = [
  {
    path: '',
    component: AdminLayoutComponent,
    children: [
      { path: '', redirectTo: 'restaurants/registration', pathMatch: 'full' },
      {
        path: 'restaurants',
        loadChildren: () => import('./restaurants/restaurants.module').then(m => m.RestaurantsModule),
        data: { title: 'Restaurants', titleI18n: 'restaurants' },
      },
      {
        path: 'material',
        loadChildren: () => import('./material/material.module').then(m => m.MaterialModule),
        data: { title: 'Material', titleI18n: 'material' },
      },
    ],
  },
  { path: '**', redirectTo: 'restaurants/registration' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      useHash: environment.useHash,
      relativeLinkResolution: 'legacy',
    }),
  ],
  exports: [RouterModule],
})
export class RoutesRoutingModule {}
