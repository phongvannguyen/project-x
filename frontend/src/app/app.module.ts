import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { MainBodyComponent } from './components/main-body/main-body.component';
import { FooterComponent } from './components/footer/footer.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { WelcomePageComponent } from './components/welcome-page/welcome-page.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { ProductListingComponent } from './components/product-listing/product-listing.component';
import { FeaturedProductsComponent } from './components/featured-products/featured-products.component';
import { PostAdComponent } from './components/post-ad/post-ad.component';
import { MyListingsComponent } from './components/my-listings/my-listings.component';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ModalModule } from 'ngx-bootstrap/modal';
import { AdDetailComponent } from './components/ad-detail/ad-detail.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { LoginComponent } from './components/login/login.component';
import { FormErrorComponent } from './components/shared/form-error/form-error.component';
import {FileUploadModule} from 'primeng/fileupload';
import { CarouselModule } from 'ngx-owl-carousel-o';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    MainBodyComponent,
    FooterComponent,
    NavigationComponent,
    WelcomePageComponent,
    CategoriesComponent,
    ProductListingComponent,
    FeaturedProductsComponent,
    PostAdComponent,
    MyListingsComponent,
    AdDetailComponent,
    SignUpComponent,
    LoginComponent,
    FormErrorComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FileUploadModule,
    CarouselModule,
    ModalModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
