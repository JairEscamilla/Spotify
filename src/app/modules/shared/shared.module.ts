import { LoadingComponent } from './components/loading/loading.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent } from './components/card/card.component';

@NgModule({
  declarations: [LoadingComponent, CardComponent],
  imports: [CommonModule],
  exports: [LoadingComponent, CardComponent],
})
export class SharedModule {}
