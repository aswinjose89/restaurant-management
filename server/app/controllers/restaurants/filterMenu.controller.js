const { Model } = require('cores/Model')
const { registrationSchema } = require('models/registration.model')
const { CustomeMessage } = require('helpers/customeMessage')
const { Jwt } = require('libs/jwt')
var _ = require('underscore');

class FilterMenuController extends Model {
  constructor() {
    super()
    this.model = new Model(registrationSchema)
    this.jwt = new Jwt()
  }

  async controller(req, res, next) {
    const { model } = this
    const { name, address, number } = req.query
    const registration = await model.findAll({})

    if (registration) {
      return new CustomeMessage(res).success(200, {
        response: {
          status: 'success',
          code: res.statusCode,
          method: req.method,
          message: 'List of Data',
          data: {
            "restaurantNames": registration.map(x=>{return {"name": x.name, "value": x.name }}),
            "menuItemNames": registration.map(x=>x.menus).flat().map(x=>{return {"name": x.itemName, "value": x.itemName }})            
          }
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

module.exports = { FilterMenuController }
