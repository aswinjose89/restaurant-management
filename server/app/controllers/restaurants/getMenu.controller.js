const { Model } = require('cores/Model')
// const { menuSchema } = require('models/menu.model')
const { registrationSchema } = require('models/registration.model')
const { CustomeMessage } = require('helpers/customeMessage')
const { Jwt } = require('libs/jwt')
var _ = require('underscore');

class GetMenuController extends Model {
  constructor() {
    super()
    this.model = new Model(registrationSchema)
    this.jwt = new Jwt()
  }

  async controller(req, res, next) {
    const { model } = this
    const { name, itemName, description, category, availability } = req.query
    let input= {
        'name' : (name && name.length>0)?{ '$regex' : name, '$options' : 'i' }: undefined        
    }    
    const menuItem = await model.findAll(input)
    if (menuItem) {
        return new CustomeMessage(res).success(200, {
          response: {
            status: 'success',
            code: res.statusCode,
            method: req.method,
            message: 'List of Data',
            data: menuItem.map(x=>x.menus).flat()
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

module.exports = { GetMenuController }
