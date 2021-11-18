import { Injectable } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RestaurantsService {

  constructor(private fb: FormBuilder) { }

  registrationForm(){
    return this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(15)]],
      description: ['', [Validators.required]],
      address: ['', [Validators.required]],
      number: ['', [Validators.required]]
    });
  }

  addMenuForm(){
    return this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(15)]],
      itemName: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(25)]],
      description: ['', [Validators.required]],
      category: ['', [Validators.required]],
      availability: ['', [Validators.required]]
    });
  }

  restSearchForm(){
    return this.fb.group({
      name: ['', []],
      itemName: ['', []],
      address: ['', []],
      restaurantRating: ['', []],
      menuRating: ['', []]
    });
  }

  getHttpParams(data){
    let httpParams = new HttpParams();
    Object.keys(data).forEach(function (key) {
        httpParams = httpParams.append(key, data[key]);
    });
    return httpParams
  }
}
