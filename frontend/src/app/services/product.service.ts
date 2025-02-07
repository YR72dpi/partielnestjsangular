import { Injectable } from '@angular/core';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private apiUrl = 'http://localhost:3000/products';

  constructor() {}

  async getProducts(): Promise<Product[]> {
    console.log('getProducts')

    try {
      const response = await fetch(this.apiUrl);
      if (!response.ok) {
        console.log("getProducts erreur")
        throw new Error('Erreur lors de la récupération des produits');
      }
      console.log('getproduct ok')
      const data = await response.json();
      console.log(data)
      return data;
    } catch (error) {
      console.error(error);
      return [];
    }
  }

  async addProduct(product: Product): Promise<Product|null> {
    try {
      const response = await fetch(this.apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(product),
      });
      if (!response.ok) {
        throw new Error('Erreur lors de l\'ajout du produit');
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  async deleteProduct(id: number): Promise<void> {
    try {
      const response = await fetch(`${this.apiUrl}/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Erreur lors de la suppression du produit');
      }
    } catch (error) {
      console.error(error);
    }
  }
}
