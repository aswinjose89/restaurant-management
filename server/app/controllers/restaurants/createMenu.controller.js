const { Model } = require('cores/Model')
const { registrationSchema } = require('models/registration.model')
const { CustomeMessage } = require('helpers/customeMessage')
const { Jwt } = require('libs/jwt')
var _ = require('underscore');

class CreateMenuController extends Model {
  constructor() {
    super()
    this.model = new Model(registrationSchema)
    this.jwt = new Jwt()
  }

  async controller(req, res, next) {
    const { model } = this
    const { name, itemName, description, category, availability } = req.body

    const menuItem = await model.findOne({ name, "menus.itemName": itemName})
    if (menuItem) {
      return new CustomeMessage(res).success(200, {
        response: {
          status: 'error',
          code: res.statusCode,
          method: req.method,
          message: 'Menu already exists for this restaurant.'
        }
      })
    }

    await registrationSchema.update({name, "menus.itemName": {$ne: itemName}}, 
    {$push: { menus: { name, itemName, description, category, availability }}},    
    (err, data)=>{
      return new CustomeMessage(res).success(200, {
        response: {
          status: 'success',
          code: res.statusCode,
          method: req.method,
          message: 'Yeah..data successfuly stored in database'
        }
      });
    });
  }
}

module.exports = { CreateMenuController }
