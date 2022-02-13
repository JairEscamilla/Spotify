import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'home-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent implements OnInit {
  @Input() variant: 'Artist' | 'Album' = 'Album';
  @Input() image = '';
  @Input() title = '';

  constructor() {}

  ngOnInit() {}
}
