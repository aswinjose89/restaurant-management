import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { RestaurantsService } from '../../services';
import { SubSink } from 'subsink';
import { ToastrService } from 'ngx-toastr';

import { ApiService } from '../../../../core/services';

@Component({
  selector: 'app-rest-registration',
  templateUrl: './rest-registration.component.html',
  styleUrls: ['./rest-registration.component.scss']
})
export class RestRegistrationComponent implements OnInit {
  addRestaurantForm: FormGroup;
  private subs = new SubSink();
  
  constructor(private toastr: ToastrService, private restSvc:RestaurantsService, private api:  ApiService) {
    this.addRestaurantForm = this.restSvc.registrationForm();
  }

  ngOnInit(): void {
  }

  submit($event) {
    if (this.addRestaurantForm.valid) {
      let data={
        name: this.addRestaurantForm.get("name").value,
        description: this.addRestaurantForm.get("description").value,
        address: this.addRestaurantForm.get("address").value,
        number: this.addRestaurantForm.get("number").value,
      };
      this.subs.add(this.api.post("create-restaurant", data).subscribe((result)=>{
        if(result && result['response'] && result['response']['status']=='success'){
          this.showToast(result['response']['message']);
          this.addRestaurantForm.reset();
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
  reset(addRestaurantForm) {
    addRestaurantForm.reset();
  }

}
