import { IAlbumItem } from '@core/models/Album.model';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IArtistElement } from 'src/app/core/models/Artist.mode';
import { SpotifyService } from 'src/app/core/services/spotify.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
})
export class HomePageComponent implements OnInit {
  artistsIsLoading = true;
  albumsIsLoading = true;
  artists: IArtistElement[] = [];
  topArtists: IArtistElement[] = [];
  albums: IAlbumItem[] = [];

  constructor(private spotifyService: SpotifyService, private router: Router) {}

  ngOnInit() {
    this.getArtists();
    this.getAlbums();
  }

  getArtists() {
    this.spotifyService.getArtists().subscribe((artists) => {
      this.artists = [...artists];
      this.topArtists = [...artists].reverse();
      this.artistsIsLoading = false;
    });
  }

  getAlbums() {
    this.spotifyService.getAlbums().subscribe((albums) => {
      this.albums = [...albums];
      this.albumsIsLoading = false;
    });
  }

  handleArtistClick(artist: IArtistElement) {
    this.router.navigate([`/albums/${artist.id}`]);
  }

  handleAlbumClick(album: IAlbumItem) {
    this.router.navigate([`/albums/${album.id}/tracks`]);
  }
}
