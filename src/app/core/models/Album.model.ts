import { IArtistElement } from 'src/app/core/models/Artist.mode';
// Generated by https://quicktype.io
import { IImage } from './Image.model';

export interface IAlbum {
  href: string;
  items: IAlbumItem[];
  limit: number;
  next: string;
  offset: number;
  previous: string;
  total: number;
}

export interface IAlbumItem {
  album_type: string;
  available_markets: null[];
  external_urls: string[];
  href: string;
  id: string;
  images: IImage[];
  name: string;
  type: string;
  uri: string;
  artists: IArtistElement[];
}
