import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductFormComponent } from '../product-form/product-form.component';
import { ReactiveFormsModule } from '@angular/forms'; 
import { ProductEditComponent } from '../../pages/modifier/product-edit.component';

@NgModule({
  declarations: [ProductFormComponent, ProductEditComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
  ],
  exports: [ProductFormComponent],
})
export class ProductModule {}
