import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SpotifyService {
  constructor(private http: HttpClient) {}

  getToken() {
    const client_id = 'dcee94f8e3df4500bd32f67e5bfa1227';
    const client_secret = '0f2af6ed9c0c4c90b333d0c11edaa966';

    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: 'Basic ' + btoa(client_id + ':' + client_secret),
        'Content-Type': 'application/x-www-form-urlencoded',
      }),
    };

    return this.http.post(
      'https://accounts.spotify.com/api/token',
      'grant_type=client_credentials',
      httpOptions
    );
  }
}
