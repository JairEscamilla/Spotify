import { TracksComponent } from './pages/tracks/tracks.component';
import { ObserveVisibilityDirective } from './directives/observe-visibility.directive';
import { SharedModule } from './../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AlbumsRoutingModule } from './albums-routing.module';
import { AlbumsComponent } from './pages/albums/albums.component';

@NgModule({
  declarations: [AlbumsComponent, TracksComponent, ObserveVisibilityDirective],
  imports: [CommonModule, AlbumsRoutingModule, SharedModule],
})
export class AlbumsModule {}
