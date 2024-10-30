import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListrestaurantComponent } from './restaurant/listrestaurant/listrestaurant.component'; // Import the ListrestaurantComponent
import { ModifrestaurantComponent } from './restaurant/modifrestaurant/modifrestaurant.component'; // Import the ModifrestaurantComponent
import { ListfoodComponent } from './food/listfood/listfood.component'; // Import the ListfoodComponent
import { ListDirectorComponent } from './director/list-director/list-director.component';
import { ListCollectionEventComponent } from './collection_event/list-collection-event/list-collection-event.component';
import { HomeComponent } from './home/home.component';


const routes: Routes = [

  { path: 'home', component: HomeComponent },

  { path: 'listDirector', component: ListDirectorComponent },

  { path: 'listEvent', component: ListCollectionEventComponent },

  { path: 'listfood', component: ListfoodComponent },

  { path: 'listrestaurant', component: ListrestaurantComponent },
  { path: 'update/:id', component: ModifrestaurantComponent },

  { path: '', redirectTo: '/listrestaurant', pathMatch: 'full' }, // Optional: default route
  { path: '**', redirectTo: '/listrestaurant' }, // Optional: wildcard route



];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
