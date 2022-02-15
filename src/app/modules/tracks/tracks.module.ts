import { SharedModule } from '@shared/shared.module';
import { TrackDetailComponent } from './pages/track-detail/track-detail.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TracksRoutingModule } from './tracks-routing.module';
import { PlyrModule } from 'ngx-plyr';

@NgModule({
  declarations: [TrackDetailComponent],
  imports: [CommonModule, TracksRoutingModule, PlyrModule, SharedModule],
})
export class TracksModule {}
