import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundPageComponent } from './not-found-page/not-found-page.component';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./modules/home/home.module').then((m) => m.HomeModule),
  },
  {
    path: 'albums',
    loadChildren: () =>
      import('./modules/albums/albums.module').then((m) => m.AlbumsModule),
  },
  {
    path: 'tracks',
    loadChildren: () =>
      import('./modules/tracks/tracks.module').then((m) => m.TracksModule),
  },
  {
    path: 'not-found',
    component: NotFoundPageComponent,
  },
  {
    path: '**',
    pathMatch: 'full',
    component: NotFoundPageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
