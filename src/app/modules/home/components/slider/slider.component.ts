import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'home-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss'],
})
export class SliderComponent implements OnInit {
  @Input() title = '';
  @Input() isLoading = true;
  constructor() {}

  ngOnInit() {}
}
