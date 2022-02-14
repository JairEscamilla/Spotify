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
  isLoading = true;
  artists: IArtistElement[] = [];

  constructor(private spotifyService: SpotifyService, private router: Router) {}

  ngOnInit() {
    this.getArtists();
  }

  getArtists() {
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
