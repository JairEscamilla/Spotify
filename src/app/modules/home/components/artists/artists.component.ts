import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'home-artists',
  templateUrl: './artists.component.html',
  styleUrls: ['./artists.component.scss'],
})
export class ArtistsComponent implements OnInit {
  @Input() title = '';
  @Input() isLoading = true;
  constructor() {}

  ngOnInit() {}
}
