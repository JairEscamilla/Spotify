import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'home-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent implements OnInit {
  @Input() variant: 'artist' | 'album' = 'album';
  constructor() {}

  ngOnInit() {}
}
