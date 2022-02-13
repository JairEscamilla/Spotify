import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { SpotifyService } from 'src/app/core/services/spotify.service';

@Component({
  selector: 'app-albums',
  templateUrl: './albums.component.html',
  styleUrls: ['./albums.component.scss'],
})
export class AlbumsComponent implements OnInit {
  artistName = '';

  constructor(
    private route: ActivatedRoute,
    private spotifyService: SpotifyService
  ) {}

  ngOnInit() {
    this.getAlbums();
    this.getArtistName();
  }

  getArtistName() {
    this.route.queryParams.subscribe((params) => {
      this.artistName = params.name;
    });
  }

  getAlbums() {
    const albumsRequest = this.route.params.pipe(
      switchMap((params) => {
        return this.spotifyService.getArtistAlbums(params.artist_id);
      })
    );

    albumsRequest.subscribe((albums) => {
      console.log(albums);
    });
  }
}
