import { Component, OnInit } from '@angular/core';
import { ProductListingModel } from 'src/app/models/product-listing.model';
import { ActivatedRoute } from '@angular/router';
import { ProductListingService } from 'src/app/services/product-listing.service';
import { AppConstants } from 'src/app/app.constants';
import { OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-ad-detail',
  templateUrl: './ad-detail.component.html',
  styleUrls: ['./ad-detail.component.css']
})
export class AdDetailComponent implements OnInit {
  public customOptions: OwlOptions = {
    navSpeed: 700,
    autoplay: true,
    nav: false,
    items: 1
  };

  public productId: string;
  public product: ProductListingModel;

  constructor(private activatedRouteService: ActivatedRoute, private productService: ProductListingService) {
    this.productId = this.activatedRouteService.snapshot.params.id;
  }

  ngOnInit() {
    this.productService.getOne(this.productId).subscribe((data) => {
      this.product = data;
      this.product.viewCount ? this.product.viewCount = this.product.viewCount + 1 : this.product.viewCount = 0;
      this.productService.editProduct(this.product).subscribe();
    });
  }

  public getImageUrl(relativeUrl: string[]): string {
    return AppConstants.URL_API + relativeUrl;
  }

}
