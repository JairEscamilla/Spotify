import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

import { IAlbumItem } from '@core/models/Album.model';
import { ITracksItem } from '@core/models/Tracks.model';
import { IAudioInterface } from '@core/models/AudioSource.model';
import { switchMap } from 'rxjs/operators';
import { SpotifyService } from 'src/app/core/services/spotify.service';

@Component({
  selector: 'app-track-detail',
  templateUrl: './track-detail.component.html',
  styleUrls: ['./track-detail.component.scss'],
})
export class TrackDetailComponent implements OnInit {
  audioSources: IAudioInterface[] = [];
  track!: ITracksItem & { album: IAlbumItem };
  isLoading = true;

  constructor(
    private route: ActivatedRoute,
    private spotifyService: SpotifyService
  ) {}

  ngOnInit() {
    this.getTrack();
  }

  getTrack() {
    const trackObservable = this.route.params.pipe(
      switchMap((params) => {
        return this.spotifyService.getTrackDetail(params.track_id);
      })
    );

    trackObservable.subscribe(
      (track) => {
        this.audioSources = [
          {
            src: track.preview_url,
            type: 'audio/mp3',
          },
        ];
        this.track = track;
        this.isLoading = false;
      },
      () => this.spotifyService.handleNotFound()
    );
  }
}
