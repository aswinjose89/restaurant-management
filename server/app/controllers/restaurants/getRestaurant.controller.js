const { Model } = require('cores/Model')
const { registrationSchema } = require('models/registration.model')
const { CustomeMessage } = require('helpers/customeMessage')
const { Jwt } = require('libs/jwt')
var _ = require('underscore');

class GetRestaurantController extends Model {
  constructor() {
    super()
    this.model = new Model(registrationSchema)
    this.jwt = new Jwt()
  }

  async controller(req, res, next) {
    const { model } = this
    const { name, address, restaurantRating, menuRating, itemName } = req.query
    let input= {
        'name' : (name && name.length>0)?{ '$regex' : name, '$options' : 'i' }: undefined,
        'average_rating' : (restaurantRating && restaurantRating.length>0)?{ '$gte' : parseInt(restaurantRating), '$lt': parseInt(restaurantRating)+1}: undefined,
        'address' : (address && address.length>0)?{ '$regex' : address, '$options' : 'i' }: undefined,        
        'menus.itemName' : (itemName && itemName.length>0)?{ '$regex' : itemName, '$options' : 'i' }: undefined,
        'menus.average_rating' : (menuRating && menuRating.length>0)?{ '$gte' : parseInt(menuRating), '$lt': parseInt(menuRating)+1}: undefined,
    }
    const registration = await model.findAll(input)

    if (registration) {
      return new CustomeMessage(res).success(200, {
        response: {
          status: 'success',
          code: res.statusCode,
          method: req.method,
          message: 'List of Data',
          data: registration
        }
      })
    }
    else{
        return new CustomeMessage(res).success(200, {
            response: {
              status: 'error',
              code: res.statusCode,
              method: req.method,
              message: 'Data Not found'
            }
          })
    }
  }
}

module.exports = { GetRestaurantController }
