import { NgModule } from '@angular/core';
import { CommonModule, NgFor } from '@angular/common';
import { ProductListComponent } from './product-list.component';
import { RouterLink } from '@angular/router';

@NgModule({
  declarations: [ProductListComponent],
  imports: [CommonModule, NgFor, RouterLink],
  exports: [ProductListComponent],
})
export class ProductModule {}
