import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css'],
  imports: [
    CommonModule,
    ReactiveFormsModule,
  ]
})
export class ProductFormComponent {
  @Output() productAdded = new EventEmitter<Product>();
  productForm: FormGroup;

  constructor(private fb: FormBuilder, private productService: ProductService) {
    this.productForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      price: [0, [Validators.required, Validators.min(0)]],
      stock: [0, [Validators.required, Validators.min(0)]],
    });
  }

  async addProduct() {
    if (this.productForm.valid) {
      try {
        const newProduct = await this.productService.addProduct(this.productForm.value) as Product;
        console.log('Produit ajouté avec succès:', newProduct);

        this.productAdded.emit(newProduct);
        this.productForm.reset();
      } catch (error) {
        console.error('Erreur lors de l\'ajout du produit:', error);
      }
    }
  }
}
