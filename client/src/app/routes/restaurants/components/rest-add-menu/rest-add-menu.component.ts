import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { SubSink } from 'subsink';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';

import { RestaurantsService } from '../../services';
import { ApiService } from '../../../../core/services';

@Component({
  selector: 'app-rest-add-menu',
  templateUrl: './rest-add-menu.component.html',
  styleUrls: ['./rest-add-menu.component.scss']
})
export class RestAddMenuComponent implements OnInit {
  addMenuForm: FormGroup;
  private subs = new SubSink();

  restaurant: any[] = [{"value":"Anjappar", "name":"Anjappar"},{"value":"Ananda Bavan", "name":"Ananda Bavan"},{"value":"Saravana Bavan", "name":"Saravana Bavan"}];
  foodCategory: any[] = [{"value":"Breakfast", "name":"Breakfast"}, {"value":"Lunch", "name":"Lunch"},{"value":"Dinner", "name":"Dinner"}];
  foodAvailability: any[] = [
    {value: 'Yes', name: 'Yes'},
    {value: 'No', name: 'No'}
  ];
  restaurantOptions: Observable<any[]>;
  categoryOptions: Observable<any[]>;

  constructor(private toastr: ToastrService, private restSvc:RestaurantsService, private api:  ApiService) {
    this.addMenuForm = this.restSvc.addMenuForm();
  }

  ngOnInit(): void {
    // this.restaurantOptions = this.addMenuForm.controls.name.valueChanges.pipe(
    //   startWith(''),
    //   map(value => (typeof value === 'string' ? value : value.name)),
    //   map(value => this._filter(value, this.restaurant)),
    // );
    this.categoryOptions = this.addMenuForm.controls.category.valueChanges.pipe(
      startWith(''),
      map(value => (typeof value === 'string' ? value : value.name)),
      map(value => this._filter(value, this.foodCategory)),
    );   
    
    this.getSearchOptions();
  }

  getSearchOptions(){
    this.subs.add(this.api.get("filter-menu", this.restSvc.getHttpParams({})).subscribe((result)=>{   
      if(result && result['response'] && result['response']['status']=='success'){
        let restaurantNames= result['response']['data']['restaurantNames'],
            menuItemNames= result['response']['data']['menuItemNames'];
        this.restaurantOptions = this.addMenuForm.controls.name.valueChanges.pipe(
          startWith(''),
          map(value => (typeof value === 'string' ? value : value.name)),
          map(value => this._filter(value, restaurantNames)),
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


  private _filter(value: string, options): any[] {
    const filterValue = value.toLowerCase();
    return options.filter(option => option.name.toLowerCase().includes(filterValue));
  }

  displayWith(obj: any): string {
    return obj && obj.name ? obj.name : obj;
  }

  submit($event) {
    if (this.addMenuForm.valid) {
      let data={
        name: this.addMenuForm.get("name").value,
        itemName: this.addMenuForm.get("itemName").value,
        description: this.addMenuForm.get("description").value,
        category: this.addMenuForm.get("category").value,
        availability: this.addMenuForm.get("availability").value
      };
      this.subs.add(this.api.post("create-menu", data).subscribe((result)=>{
        if(result && result['response'] && result['response']['status']=='success'){
          this.showToast(result['response']['message']);
        }
        else if(result && result['response'] && result['response']['status']=='error'){
          this.showToast(result['response']['message'], "error");
        }       
      },
      (error)=>{
            this.api.errorResponse(error);
      }));
    }
  }
  showToast(obj: any, flag= "success") {
    if(flag=="error"){
      this.toastr.error(JSON.stringify(obj));
    }
    else{
      this.toastr.success(JSON.stringify(obj));
    }    
  }
  reset(addMenuForm) {
    addMenuForm.reset();
  }

}
