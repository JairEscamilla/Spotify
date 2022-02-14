import { IAlbum, IAlbumItem } from './../models/Album.model';
import { IArtistElement } from './../models/Artist.mode';
import { environment } from './../../../environments/environment';
import { IToken } from './../models/Token.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { IArtists } from '../models/Artist.mode';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SpotifyService {
  artistsIds = [
    '1Ffb6ejR6Fe5IamqA5oRUF',
    '4q3ewBCX7sLwd24euuV69X',
    '12Chz98pHFMPJEknJQMWvI',
    '1Qp56T7n950O3EGMsSl81D',
    '57ekbx9PSS4ORs5wTZMSYp',
    '7x5Slu7yTE5icZjNsc3OzW',
  ];

  constructor(private http: HttpClient) {}

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

  getArtistAlbums(artistId: string, page: number): Observable<IAlbumItem[]> {
    const offset = 20 * page;
    return this.http
      .get<IAlbum>(
        `${environment.apiUrl}/artists/${artistId}/albums?offset=${offset}&limit=20`
      )
      .pipe(map((albums) => albums.items));
  }
}
