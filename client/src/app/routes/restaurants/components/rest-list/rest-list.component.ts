import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { SubSink } from 'subsink';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

import { StarRatingColor } from '../star-rating/star-rating.component';

import { RestaurantsService } from '../../services';
import { ApiService } from '../../../../core/services';

@Component({
  selector: 'app-rest-list',
  templateUrl: './rest-list.component.html',
  styleUrls: ['./rest-list.component.scss']
})
export class RestListComponent implements OnInit {
  searchRestaurantForm: FormGroup;
  private subs = new SubSink();  
  restaurantOptions: Observable<string[]>;
  menuItemNameOptions: Observable<string[]>;
  public restaurantList: any[]; 
  public ratingOptionList= [{"name":1, "value": 1}, {"name":2, "value": 2}, {"name":3, "value": 3}, {"name":4, "value": 4}, {"name":5, "value": 5}]

  rating:number = 3;
  starCount:number = 5;
  starColor:StarRatingColor = StarRatingColor.accent;
  starColorP:StarRatingColor = StarRatingColor.primary;
  starColorW:StarRatingColor = StarRatingColor.warn;

  constructor(private router: Router, private toastr: ToastrService, private restSvc:RestaurantsService, private api:  ApiService) {
    this.searchRestaurantForm = this.restSvc.restSearchForm();
  }

  ngOnInit(): void {
    this.getRestaurants();
    this.getSearchOptions();
  }

  private _filter(value: string, options): string[] {
    const filterValue = value.toLowerCase();
    return options.filter(option => option.name.toLowerCase().includes(filterValue));
  }

  displayWith(obj: any): string {
    return obj && obj.name ? obj.name : obj;
  }

  onRatingChanged(rating, restaurant){
    this.rating = rating;
    let data= {
      "name": restaurant.name,
      "rating": rating
    }    
    this.subs.add(this.api.post("add-restaurant-rating", data).subscribe((result)=>{   
      if(result && result['response'] && result['response']['status']=='success'){
        this.showToast(result['response']['message'], "success");
      }
      else{
        this.showToast(result['response']['message'], "error");
      }      
    },
    (error)=>{
          this.api.errorResponse(error);
    }));
  }

  getRestaurants(){
    let data= {}
    this.subs.add(this.api.get("get-restaurant", this.restSvc.getHttpParams({})).subscribe((result)=>{   
      if(result && result['response'] && result['response']['status']=='success'){
        this.restaurantList = result['response']['data']
      }
      else{
        this.showToast(result['response']['message'], "error");
      }      
    },
    (error)=>{
          this.api.errorResponse(error);
    }));
  }

  getSearchOptions(){
    this.subs.add(this.api.get("filter-menu", this.restSvc.getHttpParams({})).subscribe((result)=>{   
      if(result && result['response'] && result['response']['status']=='success'){
        let restaurantNames= result['response']['data']['restaurantNames'],
            menuItemNames= result['response']['data']['menuItemNames'];
        this.restaurantOptions = this.searchRestaurantForm.controls.name.valueChanges.pipe(
          startWith(''),
          map(value => (typeof value === 'string' ? value : value.name)),
          map(value => this._filter(value, restaurantNames)),
        );
        this.menuItemNameOptions = this.searchRestaurantForm.controls.itemName.valueChanges.pipe(
          startWith(''),
          map(value => (typeof value === 'string' ? value : value.name)),
          map(value => this._filter(value, menuItemNames)),
        );
      }
      else{
        this.showToast(result['response']['message'], "error");
      }      
    },
    (error)=>{
          this.api.errorResponse(error);
    }));
  }

  showToast(obj: any, flag= "success") {
    if(flag=="error"){
      this.toastr.error(JSON.stringify(obj));
    }
    else{
      this.toastr.success(JSON.stringify(obj));
    }    
  }

  submit($event) {
    if (this.searchRestaurantForm.valid) {
      let name= this.searchRestaurantForm.get("name").value,
      itemName = this.searchRestaurantForm.get("itemName").value,
      restaurantRating = this.searchRestaurantForm.get("restaurantRating").value,
      menuRating = this.searchRestaurantForm.get("menuRating").value,
      address = this.searchRestaurantForm.get("address").value;
      let data= {
        name, itemName, restaurantRating, menuRating, address
      };
      this.subs.add(this.api.get("get-restaurant", this.restSvc.getHttpParams(data)).subscribe((result)=>{
        if(result && result['response'] && result['response']['status']=='success'){
          this.restaurantList = result['response']['data']
        }
        else{
          this.showToast(result['response']['message'], "error");
        } 
      },
      (error)=>{
            this.api.errorResponse(error);
      }));
    }
  }
  reset(searchRestaurantForm) {
    searchRestaurantForm.reset();
  }

  viewMenu(restaurant, searchRestaurantForm){
    this.router.navigate(["/restaurants/menu-list"], { queryParams: {restaurant: restaurant.name}});

  }
}