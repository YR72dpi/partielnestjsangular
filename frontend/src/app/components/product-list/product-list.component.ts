import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
  imports: [
    CommonModule, RouterModule
  ],
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];

  constructor(private productService: ProductService) {}

  async ngOnInit() {
    await this.loadProducts();
  }

  async loadProducts() {
    console.log("loadProducts")
    try {
      const data = await this.productService.getProducts();
      console.log('Produits récupérés:', data);
      this.products = data;
    } catch (error) {
      console.error('Erreur lors de la récupération des produits:', error);
    }
  }

  async deleteProduct(id: number) {
    try {
      await this.productService.deleteProduct(id);
      this.products = this.products.filter((product) => product.id !== id);
    } catch (error) {
      console.error('Erreur lors de la suppression du produit:', error);
    }
  }

  onProductAdded(newProduct: Product) {
    this.products.push(newProduct);
  }
}
