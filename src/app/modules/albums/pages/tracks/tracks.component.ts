import { switchMap } from 'rxjs/operators';
import { Component, OnInit } from '@angular/core';

import { ITracksItem } from '@core/models/Tracks.model';
import { IAlbumItem } from '@core/models/Album.model';
import { SpotifyService } from 'src/app/core/services/spotify.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-tracks',
  templateUrl: './tracks.component.html',
  styleUrls: ['./tracks.component.scss'],
})
export class TracksComponent implements OnInit {
  albumName = '';
  albumId = '';
  tracks: ITracksItem[] = [];
  album!: IAlbumItem;
  isLoading = true;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private spotifyService: SpotifyService
  ) {}

  ngOnInit() {
    this.getTracks();
    this.getAlbum();
  }

  getTracks() {
    const tracksObservable = this.route.params.pipe(
      switchMap((params) => {
        this.albumId = params.album_id;
        return this.spotifyService.getAlbumTracks(this.albumId);
      })
    );

    tracksObservable.subscribe(
      (tracks) => {
        this.tracks = [...tracks];
      },
      () => this.spotifyService.handleNotFound()
    );
  }

  getAlbum() {
    this.spotifyService.getAlbum(this.albumId).subscribe((album) => {
      this.album = album;
      this.albumName = this.album.name;
      this.isLoading = false;
    });
  }

  handleTrackClick(track: ITracksItem) {
    this.router.navigate([`/tracks/${track.id}`]);
  }
}
