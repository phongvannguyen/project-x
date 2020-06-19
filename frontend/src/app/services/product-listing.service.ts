import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ProductListingModel } from '../models/product-listing.model';
import { Observable, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { AppConstants } from '../app.constants';

@Injectable({
  providedIn: 'root'
})
export class ProductListingService {
  public uri = AppConstants.URL_API + 'product-list';
  private productsSub = new BehaviorSubject<ProductListingModel[]>(null);
  public products$ = this.productsSub.asObservable();

  private myProductSub = new BehaviorSubject<ProductListingModel[]>(null);
  public myProductSub$ = this.myProductSub.asObservable();

  constructor(private http: HttpClient) {}

  public addProduct(productData: FormData): Observable<any> {
    console.log(productData);
    return this.http.post(`${this.uri}/add`, productData);
  }

  public getAll(): Observable<ProductListingModel[]> {
    return this.http.get(this.uri).pipe(map((products: ProductListingModel[]) => {
      this.productsSub.next(products);
      return products;
    }));
  }

  public getMyProducts(userID: string): Observable<ProductListingModel[]> {
    return this.http.get(this.uri + '/myproducts/' + userID).pipe(map((products: ProductListingModel[]) => {
      this.myProductSub.next(products);
      return products;
    }));
  }

  public getOne(id: string): Observable<any> {
    return this.http.get(this.uri + '/' + id);
  }

  public editProduct(product: ProductListingModel): Observable<any> {
    return this.http.post(this.uri + '/edit/' + product._id, product);
  }

  public deleteProduct(id: string): Observable<any> {
    return this.http.get(this.uri + '/delete/' + id);
  }

  public searchProduct(query: string) {
    return this.http.get(this.uri + '/search/' + query);
  }

}
