import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomepageComponent } from './homepage/homepage.component';
import { PageNotFontComponent } from './page-not-font/PageNotFontComponent';


@NgModule({
  declarations: [
    HomepageComponent,
    PageNotFontComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule
  ]
})
export class HomeModule { }
