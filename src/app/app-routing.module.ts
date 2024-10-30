import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListrestaurantComponent } from './restaurant/listrestaurant/listrestaurant.component'; // Import the ListrestaurantComponent
import { ModifrestaurantComponent } from './restaurant/modifrestaurant/modifrestaurant.component'; // Import the ModifrestaurantComponent
import { ListfoodComponent } from './food/listfood/listfood.component'; // Import the ListfoodComponent
import { ListefeedbackComponent } from './feedback/listefeedback/listefeedback.component';

const routes: Routes = [
  { path: 'listfood', component: ListfoodComponent },

  { path: 'listrestaurant', component: ListrestaurantComponent },
  { path: 'update/:id', component: ModifrestaurantComponent },
  { path: 'listfeedback', component: ListefeedbackComponent },


  { path: '', redirectTo: '/listrestaurant', pathMatch: 'full' }, // Optional: default route
  { path: '**', redirectTo: '/listrestaurant' } // Optional: wildcard route

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
