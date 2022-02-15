import { IAlbumItem } from './../../../../core/models/Album.model';
import { ITracksItem } from './../../../../core/models/Tracks.model';
import { switchMap } from 'rxjs/operators';
import { SpotifyService } from 'src/app/core/services/spotify.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

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
    this.getAlbumName();
    this.getTracks();
    this.getAlbum();
  }

  getAlbumName() {
    this.route.queryParams.subscribe((params) => {
      this.albumName = params.name;
    });
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
      this.isLoading = false;
    });
  }

  handleTrackClick(track: ITracksItem) {
    this.router.navigate([`/tracks/${track.id}`]);
  }
}
