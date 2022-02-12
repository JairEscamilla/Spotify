import { Component, OnInit } from '@angular/core';
import { SpotifyService } from './core/services/spotify.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'spotify';

  constructor(private spotifyService: SpotifyService) {}

  ngOnInit(): void {
    this.getSpotifyToken();
  }

  getSpotifyToken() {
    console.log('Getting token');
    this.spotifyService.getToken().subscribe(
      (token) => {
        console.log('Token ', token);
      },
      (error) => {
        console.error('Este es el error: ', error);
      }
    );
  }
}
