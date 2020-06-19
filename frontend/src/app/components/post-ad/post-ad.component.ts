import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ProductListingService } from 'src/app/services/product-listing.service';
import { ProductListingModel } from 'src/app/models/product-listing.model';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-post-ad',
  templateUrl: './post-ad.component.html',
  styleUrls: ['./post-ad.component.css']
})
export class PostAdComponent implements OnInit {
  public productForm: FormGroup;
  public productModel: ProductListingModel = new ProductListingModel();
  public updateProduct: ProductListingModel;
  public submitted = false;
  public uploadedFiles: any[] = [];

  constructor(private fb: FormBuilder, private productService: ProductListingService,
              public bsModalRef: BsModalRef, private userService: UserService) {
    this.createProductForm();
  }

  ngOnInit() {}

  onUpload(event: any) {
    for (const file of event.files) {
        this.uploadedFiles.push(file);
    }

    console.log(this.uploadedFiles);
  }

  public createProductForm(): void {
    this.productForm = this.fb.group({
      category: [this.updateProduct ? this.updateProduct.category : '', Validators.required],
      product_name: [this.updateProduct ? this.updateProduct.productName : '', Validators.required],
      price: [this.updateProduct ? this.updateProduct.price : '', Validators.required],
      description: [this.updateProduct ? this.updateProduct.description : '', Validators.required]
    });
  }

  // validates fields
  public isError(formControlName: string): boolean {
    return (
      this.productForm.controls[formControlName].invalid &&
      (this.productForm.controls[formControlName].dirty ||
        this.productForm.controls[formControlName].touched)
    );
  }

  public addProduct(): void {
    this.submitted = true;
    if (this.productForm.invalid) {
      console.log('form is invalid');
      return;
    }

    this.productModel.category = this.productForm.get('category').value;
    this.productModel.productName = this.productForm.get('product_name').value;
    this.productModel.price = this.productForm.get('price').value;
    this.productModel.description = this.productForm.get('description').value;
    this.productModel.userId = JSON.parse(localStorage.getItem('currentUser'))._id;

    const productData = new FormData();
    productData.append('productDTO', JSON.stringify(this.productModel));
    this.uploadedFiles.forEach((file) => {
      productData.append('productImages', file);
    });

    this.productService.addProduct(productData).subscribe((data) => {
      this.productService.getAll().subscribe();
      this.submitted = false;
      this.bsModalRef.hide();
    });
  }

  public editProduct(): void {
    this.updateProduct.category = this.productForm.get('category').value;
    this.updateProduct.productName = this.productForm.get('product_name').value;
    this.updateProduct.price = this.productForm.get('price').value;
    this.updateProduct.description = this.productForm.get('description').value;
    this.productService.editProduct(this.updateProduct).subscribe(res => console.log('Updated'));
  }
}
