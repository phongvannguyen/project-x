import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PostAdComponent } from './components/post-ad/post-ad.component';
import { MainBodyComponent } from './components/main-body/main-body.component';
import { MyListingsComponent } from './components/my-listings/my-listings.component';
import { AdDetailComponent } from './components/ad-detail/ad-detail.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { LoginComponent } from './components/login/login.component';
import { IsLoginGuard } from './guards/is-login.guard';

const appRoutes: Routes = [
  { path: '', component: MainBodyComponent},
  { path: 'my-listings', component: MyListingsComponent, canActivate: [IsLoginGuard]},
  { path: 'ad-detail/:id', component: AdDetailComponent},
  { path: 'register', component: SignUpComponent},
  { path: 'login', component: LoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule],
  entryComponents: [
    PostAdComponent
  ]
})
export class AppRoutingModule { }
