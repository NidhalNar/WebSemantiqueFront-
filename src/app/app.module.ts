import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { ListrestaurantComponent } from './restaurant/listrestaurant/listrestaurant.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ModifrestaurantComponent } from './restaurant/modifrestaurant/modifrestaurant.component';
import { ListfoodComponent } from './food/listfood/listfood.component';
import { ListefeedbackComponent } from './feedback/listefeedback/listefeedback.component';

@NgModule({
  declarations: [
    AppComponent,
    ListrestaurantComponent,
    ModifrestaurantComponent,
    ListfoodComponent,
    ListefeedbackComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
