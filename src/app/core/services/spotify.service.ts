import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { ITracksItem, ITracks } from '@core/models/Tracks.model';
import { IAlbum, IAlbumItem } from '@core/models/Album.model';
import { IArtistElement } from '@core/models/Artist.mode';
import { environment } from '@environments/environment';
import { IToken } from '@core/models/Token.model';
import { IArtists } from '@core/models/Artist.mode';

@Injectable({
  providedIn: 'root',
})
export class SpotifyService {
  artistsIds = [
    '1Ffb6ejR6Fe5IamqA5oRUF',
    '4q3ewBCX7sLwd24euuV69X',
    '13wFTN72PGSUxzEHJP5Ljs',
    '12Chz98pHFMPJEknJQMWvI',
    '11mqrDSFRRz8g0Wb3syJj5',
    '2nszmSgqreHSdJA3zWPyrW',
    '09xj0S68Y1OU1vHMCZAIvz',
    '57ekbx9PSS4ORs5wTZMSYp',
    '7x5Slu7yTE5icZjNsc3OzW',
  ];

  albumsIds = [
    '41VfVz6sKvbm1yCbqAlwfM',
    '54aEzE4X5e4iZVkM5tSNsA',
    '59wgQxKgwb9vnpurJ7DSb7',
    '3bbeAIMaGSW6gUMeGqw5VS',
    '7FqHuAvmREiIwVXVpZ9ooP',
    '6IYPmM3xsOPL2XPSvf1ZAz',
    '7EJ5pXrSqqfybKyfbvlz84',
    '3KuXEGcqLcnEYWnn3OEGy0',
  ];

  constructor(private http: HttpClient, private router: Router) {}

  getToken(): Observable<string> {
    const client_id = 'dcee94f8e3df4500bd32f67e5bfa1227';
    const client_secret = '0f2af6ed9c0c4c90b333d0c11edaa966';

    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: 'Basic ' + btoa(client_id + ':' + client_secret),
        'Content-Type': 'application/x-www-form-urlencoded',
      }),
    };

    return this.http
      .post<IToken>(
        'https://accounts.spotify.com/api/token',
        'grant_type=client_credentials',
        httpOptions
      )
      .pipe(map((data) => data.access_token));
  }

  getArtists(): Observable<IArtistElement[]> {
    const artistsIds = this.artistsIds.join(',');

    return this.http
      .get<IArtists>(`${environment.apiUrl}/artists?ids=${artistsIds}`)
      .pipe(map((artists) => artists.artists));
  }

  getAlbums(): Observable<IAlbumItem[]> {
    const albumsIds = this.albumsIds.join(',');

    return this.http
      .get<{
        albums: IAlbumItem[];
      }>(`${environment.apiUrl}/albums?ids=${albumsIds}`)
      .pipe(map((albums) => albums.albums));
  }

  getAlbum(albumId: string): Observable<IAlbumItem> {
    return this.http.get<IAlbumItem>(`${environment.apiUrl}/albums/${albumId}`);
  }

  getArtistAlbums(artistId: string, page: number): Observable<IAlbumItem[]> {
    const offset = 20 * page;
    return this.http
      .get<IAlbum>(
        `${environment.apiUrl}/artists/${artistId}/albums?offset=${offset}&limit=20`
      )
      .pipe(map((albums) => albums.items));
  }

  getAlbumTracks(albumId: string): Observable<ITracksItem[]> {
    return this.http
      .get<ITracks>(`${environment.apiUrl}/albums/${albumId}/tracks`)
      .pipe(map((tracks) => tracks.items));
  }

  getTrackDetail(trackId: string) {
    return this.http.get<ITracksItem & { album: IAlbumItem }>(
      `${environment.apiUrl}/tracks/${trackId}`
    );
  }

  getArtist(artistId: string): Observable<IArtistElement> {
    return this.http.get<IArtistElement>(
      `${environment.apiUrl}/artists/${artistId}`
    );
  }

  handleNotFound() {
    this.router.navigate(['/not-found']);
  }
}
