import { Router } from '@angular/router';
import { IArtistElement } from './../../../../core/models/Artist.mode';
import { SpotifyService } from './../../../../core/services/spotify.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'home-artists',
  templateUrl: './artists.component.html',
  styleUrls: ['./artists.component.scss'],
})
export class ArtistsComponent implements OnInit {
  isLoading = true;
  artists: IArtistElement[] = [];

  constructor(private spotifyService: SpotifyService, private router: Router) {}

  ngOnInit() {
    this.spotifyService.getArtists().subscribe((artists) => {
      this.artists = [...artists];
      this.isLoading = false;
    });
  }

  handleClick(artist: IArtistElement) {
    this.router.navigate([`/albums/${artist.id}`], {
      queryParams: { name: artist.name },
    });
  }
}
