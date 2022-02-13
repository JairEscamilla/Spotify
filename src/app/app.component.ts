import { StorageService } from './core/services/storage.service';
import { Component, OnInit } from '@angular/core';
import { SpotifyService } from './core/services/spotify.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'spotify';

  constructor(
    private spotifyService: SpotifyService,
    private storageService: StorageService
  ) {}

  ngOnInit(): void {
    if (!this.storageService.retrieveToken()) {
      this.getSpotifyToken();
    }
  }

  getSpotifyToken() {
    this.spotifyService.getToken().subscribe(
      (token) => {
        this.storageService.saveToken(token);
      },
      (error) => {
        console.error('Something went wrong): ', error);
      }
    );
  }
}
