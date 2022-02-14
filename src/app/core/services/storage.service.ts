import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  constructor() {}

  saveToken(token: string) {
    localStorage.setItem('token', token);
  }

  retrieveToken() {
    const token = localStorage.getItem('token');
    return token;
  }

  clear() {
    localStorage.clear();
  }
}
