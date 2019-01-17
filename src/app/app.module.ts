import { BrowserModule } from '@angular/platform-browser';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { AuthGuardService } from './services/auth-guard.service'

import { AppComponent } from './app.component';

import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FooterComponent } from './sections/footer/footer.component';
import { EcommerceComponent } from './sections/ecommerce/ecommerce.component';
import { NavigationComponent } from './sections/navigation/navigation.component';
import { IntroComponent } from './sections/intro/intro.component';
import { FeaturesComponent } from './sections/features/features.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './sections/home/home.component';
import { ToastrModule } from 'ngx-toastr';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { CustomerAccountDetailsComponent } from './customer-account/customer-account-details/customer-account-details.component';
import { CustomerAccountOrderDetailsComponent } from './customer-account/customer-account-order-details/customer-account-order-details.component';

const appRoutes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  {
    path: 'home', children: [
      {
        path: '',
        component: HomeComponent
      },
      {
        path: 'account/:id',
        component: CustomerAccountDetailsComponent
      },
      {
        path: 'cart/:id',
        component: CustomerAccountOrderDetailsComponent
      }
    ],
    canActivate: [AuthGuardService]
  },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    EcommerceComponent,
    NavigationComponent,
    IntroComponent,
    FeaturesComponent,
    LoginComponent,
    SignupComponent,
    HomeComponent,
    PageNotFoundComponent,
    CustomerAccountDetailsComponent,
    CustomerAccountOrderDetailsComponent
  ],
  imports: [
    CommonModule,
    BrowserAnimationsModule, ToastrModule.forRoot({
      timeOut: 3000,
      positionClass: 'toast-top-center',
      preventDuplicates: true,
    }),
    RouterModule.forRoot(
      appRoutes// <-- debugging purposes only
    ),
    BrowserModule,
    BrowserAnimationsModule,
    MDBBootstrapModule.forRoot(),
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [
    AuthGuardService
  ],
  bootstrap: [AppComponent],
  schemas: [NO_ERRORS_SCHEMA]
})
export class AppModule { }
