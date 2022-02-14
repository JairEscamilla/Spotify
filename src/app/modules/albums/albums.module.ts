import { SharedModule } from './../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AlbumsRoutingModule } from './albums-routing.module';
import { AlbumsComponent } from './pages/albums/albums.component';

@NgModule({
  declarations: [AlbumsComponent],
  imports: [CommonModule, AlbumsRoutingModule, SharedModule],
})
export class AlbumsModule {}
