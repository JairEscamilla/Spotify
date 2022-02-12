import { CardComponent } from './components/card/card.component';
import { HomePageComponent } from './home-page/home-page.component';
import { SharedModule } from '@shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';

@NgModule({
  declarations: [HomePageComponent, CardComponent],
  imports: [CommonModule, HomeRoutingModule, SharedModule],
})
export class HomeModule {}
