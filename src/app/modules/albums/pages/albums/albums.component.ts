import { IAlbumItem } from '@core/models/Album.model';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { concatMap, switchMap } from 'rxjs/operators';
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
    private router: Router,
    private spotifyService: SpotifyService
  ) {}

  ngOnInit() {
    this.getAlbums();
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

    albumsRequest
      .pipe(
        concatMap((albums) => {
          this.albums = [...albums];
          return this.spotifyService.getArtist(this.artistId);
        })
      )
      .subscribe(
        (artist) => {
          this.artistName = artist.name;
          this.isLoading = false;
        },
        () => this.spotifyService.handleNotFound()
      );
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

  handleAlbumClick(album: IAlbumItem) {
    this.router.navigate([`/albums/${album.id}/tracks`], {
      queryParams: {
        name: album.name,
      },
    });
  }
}
