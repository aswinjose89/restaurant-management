import { Component, OnInit } from '@angular/core';
import { SubSink } from 'subsink';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';

import { StarRatingColor } from '../star-rating/star-rating.component';
import { RestaurantsService } from '../../services';
import { ApiService } from '../../../../core/services';

@Component({
  selector: 'app-rest-menu-list',
  templateUrl: './rest-menu-list.component.html',
  styleUrls: ['./rest-menu-list.component.scss']
})
export class RestMenuListComponent implements OnInit {
  private subs = new SubSink();
  public menuList: any[];
  public restaurant;
  rating:number = 3;
  starCount:number = 5;
  starColor:StarRatingColor = StarRatingColor.accent;
  starColorP:StarRatingColor = StarRatingColor.primary;
  starColorW:StarRatingColor = StarRatingColor.warn;

  constructor(private route: ActivatedRoute, private toastr: ToastrService, private restSvc:RestaurantsService, private api:  ApiService) { }

  ngOnInit(): void {    
    this.getMenuItems()
  }

  onRatingChanged(rating, menu){
    this.rating = rating;
    let data= {
      "name": menu.name,
      "itemName": menu.itemName,
      "rating": rating
    }    
    this.subs.add(this.api.post("add-menu-rating", data).subscribe((result)=>{   
      if(result && result['response'] && result['response']['status']=='success'){
        this.showToast(result['response']['message'], "success");
        menu['average_rating']= result['response']['data']['average_rating']
      }
      else{
        this.showToast(result['response']['message'], "error");
      }      
    },
    (error)=>{
          this.api.errorResponse(error);
    }));
  }

  getMenuItems(){
    this.restaurant = this.route.snapshot.queryParams.restaurant;
    let data= {}
    if(this.restaurant){
      data['name']= this.restaurant
    }    
    this.subs.add(this.api.get("get-menu", this.restSvc.getHttpParams(data)).subscribe((result)=>{   
      if(result && result['response'] && result['response']['status']=='success'){
        this.menuList = result['response']['data']
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

}