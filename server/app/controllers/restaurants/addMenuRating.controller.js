const { Model } = require('cores/Model')
const { registrationSchema } = require('models/registration.model')
const { CustomeMessage } = require('helpers/customeMessage')
const { Jwt } = require('libs/jwt')
var _ = require('underscore');

class AddMenuRatingController extends Model {
  constructor() {
    super()
    this.model = new Model(registrationSchema)
    this.jwt = new Jwt()
  }

  async controller(req, res, next) {
    const { model } = this
    let { name, itemName, rating } = req.body
    let input= {
        name,
        'menus.itemName' : (itemName && itemName.length>0)?itemName: undefined,
    }
    const registration = await model.findOne(input)
    let specificmenu= registration.menus.find(x=>x.itemName==itemName);

    let total_user_rating= (specificmenu)?specificmenu.total_user_rating+1: 1;
    rating= (specificmenu)?specificmenu.rating+ rating: 1;
    let average_rating=rating/total_user_rating;
    await registrationSchema.update({name, "menus.itemName": {$eq: itemName}},  
    {$set: { 
        'menus.$.total_user_rating': total_user_rating,
        'menus.$.rating': rating, 
        'menus.$.average_rating': average_rating
    }},
    (err, data)=>{
      return new CustomeMessage(res).success(200, {
        response: {
          status: 'success',
          code: res.statusCode,
          method: req.method,
          message: 'Menu rating successully updated in database',
          data: {
            average_rating,
            rating,
            total_user_rating
          }
        }
      });
    });
  }
}

module.exports = { AddMenuRatingController }
