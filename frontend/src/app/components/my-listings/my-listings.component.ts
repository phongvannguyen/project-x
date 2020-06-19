import { Component, OnInit, OnDestroy, TemplateRef } from '@angular/core';
import { ProductListingService } from 'src/app/services/product-listing.service';
import { ProductListingModel } from 'src/app/models/product-listing.model';
import { ActivatedRoute, Router } from '@angular/router';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { PostAdComponent } from '../post-ad/post-ad.component';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';


@Component({
  selector: 'app-my-listings',
  templateUrl: './my-listings.component.html',
  styleUrls: ['./my-listings.component.css']
})
export class MyListingsComponent implements OnInit, OnDestroy {

  public products: ProductListingModel[];
  public bsModalRef: BsModalRef;
  public destroySubscription = new Subject<any>();
  public exitModalRef: BsModalRef;
  message: string;

  isShown: boolean;

  constructor(
    private productService: ProductListingService,
    private router: Router,
    private bsModalService: BsModalService,
    private exitModalService: BsModalService
  ) { }

  ngOnInit() {
    const userID = JSON.parse(localStorage.getItem('currentUser'))._id;
    this.productService.myProductSub$
    .pipe(takeUntil(this.destroySubscription))
    .subscribe((products) => {
      if (products) {
        this.products = products;
      } else {
        this.productService.getMyProducts(userID)
          .pipe(takeUntil(this.destroySubscription))
          .subscribe();
      }
    });
  }

  ngOnDestroy() {
    this.destroySubscription.next();
    this.destroySubscription.complete();
  }

  public deleteProduct(id: string): void {
    this.productService.deleteProduct(id).subscribe(res => {
      console.log('Deleted');
      this.productService.getAll().subscribe();
    });

    this.exitModalRef.hide();
  }

  public fillProductUpdateForm(product: ProductListingModel): void {
    this.bsModalRef = this.bsModalService.show(PostAdComponent);
    this.bsModalRef.content.updateProduct = product;
    this.bsModalRef.content.createProductForm();
  }

  public goToAdDetail(id: string): void {
    this.router.navigate(['ad-detail', id]);
  }

  openModal(template: TemplateRef<any>) {
    this.exitModalRef = this.exitModalService.show(template, {class: 'modal-sm'});
  }

  decline(): void {
    this.message = 'Declined!';
    this.exitModalRef.hide();
  }
}
