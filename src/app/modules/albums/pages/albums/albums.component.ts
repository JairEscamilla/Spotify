import { IAlbumItem } from './../../../../core/models/Album.model';
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
  albums: IAlbumItem[] = [];
  isLoading = true;
  currentPage = 0;
  artistId = '';
  hasMoreResults = true;

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
        this.artistId = params.artist_id;
        return this.spotifyService.getArtistAlbums(
          this.artistId,
          this.currentPage
        );
      })
    );

    albumsRequest.subscribe((albums) => {
      this.albums = [...albums];

      this.isLoading = false;
    });
  }

  loadNextPage() {
    if (this.isLoading || !this.hasMoreResults) {
      return;
    }
    this.currentPage++;
    this.spotifyService
      .getArtistAlbums(this.artistId, this.currentPage)
      .subscribe((albums) => {
        if (albums.length === 0) {
          this.hasMoreResults = false;
        }
        this.albums = [...this.albums, ...albums];
      });
  }
}
