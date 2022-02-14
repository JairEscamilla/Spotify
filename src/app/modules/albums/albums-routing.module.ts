import { TracksComponent } from './pages/tracks/tracks.component';
import { AlbumsComponent } from './pages/albums/albums.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: ':artist_id',
    component: AlbumsComponent,
  },
  {
    path: ':album_id/tracks',
    component: TracksComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AlbumsRoutingModule {}
