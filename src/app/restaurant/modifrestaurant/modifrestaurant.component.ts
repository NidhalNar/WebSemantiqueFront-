import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { restclass } from '../../models/restclass'; // Update with your actual path
import { RestaurantService } from '../../service/restaurant.service'; // Update with your actual path

@Component({
  selector: 'app-modifrestaurant',
  templateUrl: './modifrestaurant.component.html',
  styleUrls: ['./modifrestaurant.component.css']
})
export class ModifrestaurantComponent implements OnInit {
  reactiveForm: FormGroup;
  restaurantId!: string;

  // Assuming you have a list of restaurants
  restaurants: restclass[] = [];

  constructor(
    private router: Router,
    private restaurantService: RestaurantService,
    private fb: FormBuilder,
    private route: ActivatedRoute // Inject ActivatedRoute to get the ID from the route
  ) {
    this.reactiveForm = this.fb.group({
      restaurant: [''],
      name: [''],
      contact: [''],
      address: ['']
    });
  }

  ngOnInit(): void {
    // Get the full restaurant URL from the route parameters
    const fullId = this.route.snapshot.paramMap.get('id') || '';
    
    // Decode the URL and extract the restaurant ID directly
    const decodedId = decodeURIComponent(fullId); // Decode the URL-encoded ID
    this.restaurantId = decodedId.split('#')[1] || decodedId; // Handle if there's no '#' character

    // Load the existing restaurant data
    this.loadRestaurantData();
}

loadRestaurantData() {
  console.log('Searching for restaurant with ID:', this.restaurantId);
  
  // Check if the restaurantId is correctly matched against the list
  const restaurant = this.restaurants.find(r => r.restaurant.endsWith(this.restaurantId));
  
  if (restaurant) {
      this.reactiveForm.patchValue({
          restaurant: restaurant.restaurant,
          name: restaurant.name,
          contact: restaurant.contact,
          address: restaurant.address
      });
  } else {
      console.error('Restaurant not found');
      alert('Restaurant not found. Please check the ID and try again.'); // User-friendly message
  }
}


  update() {
    const updatedRestaurant: restclass = {
      restaurant: this.reactiveForm.value.restaurant,
      name: this.reactiveForm.value.name,
      contact: this.reactiveForm.value.contact,
      address: this.reactiveForm.value.address
    };

    console.log('Updated restaurant:', updatedRestaurant); // Log to check values

    this.restaurantService.modifyRestaurant2(updatedRestaurant).subscribe(
      () => {
        console.log('Restaurant updated successfully');
        this.router.navigate(['restaurants']); // Adjust navigation as needed
      },
      error => {
        console.error('Error updating restaurant:', error);
      }
    );
  }
}
