import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule, RouterOutlet } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProductService } from '../../services/product.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css'],
  imports: [
      ReactiveFormsModule,
    ]
})
export class ProductEditComponent implements OnInit {
  productForm: FormGroup;
  productId: number | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private productService: ProductService
  ) {
    this.productForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      price: [0, [Validators.required, Validators.min(0)]],
      stock: [0, [Validators.required, Validators.min(0)]],
    });
  }

  ngOnInit() {
    this.productId = Number(this.route.snapshot.paramMap.get('id'));
    console.log('ID du produit:', this.productId);
    this.loadProduct();
  }

  async loadProduct() {
    try {
      const response = await fetch(`http://localhost:3000/products/${this.productId}`);
      const product = await response.json();
      this.productForm.patchValue(product);
    } catch (error) {
      console.error('Erreur lors du chargement du produit:', error);
    }
  }

  async updateProduct() {
    if (this.productForm.valid) {
      try {
        await fetch(`http://localhost:3000/products/${this.productId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(this.productForm.value),
        });

        console.log('Produit modifié avec succès');
        this.router.navigate(['/']);
      } catch (error) {
        console.error('Erreur lors de la modification du produit:', error);
      }
    }
  }
}
