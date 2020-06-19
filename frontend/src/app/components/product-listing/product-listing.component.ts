import { Component, OnInit } from '@angular/core';
import { ProductListingService } from 'src/app/services/product-listing.service';
import { ProductListingModel } from 'src/app/models/product-listing.model';
import { Router } from '@angular/router';
import { AppConstants } from 'src/app/app.constants';

@Component({
  selector: 'app-product-listing',
  templateUrl: './product-listing.component.html',
  styleUrls: ['./product-listing.component.css']
})
export class ProductListingComponent implements OnInit {
  public products: ProductListingModel[] = [];
  constructor(private productService: ProductListingService, private router: Router) { }

  ngOnInit() {
    this.productService.getAll().subscribe((products: ProductListingModel[]) => {
      this.products = products;
    });
  }

  public saveProduct(product: ProductListingModel): void {
    console.log('You saved a product', product.productName);
  }

  public getImageUrl(relativeUrl: string[]): string {
    return AppConstants.URL_API + relativeUrl[0];
  }
}
