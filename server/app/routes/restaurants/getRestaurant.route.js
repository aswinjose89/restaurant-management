const { Controller } = require('cores/Controller')
const { View } = require('cores/View')
const { GetRestaurantController } = require('controllers/restaurants/getRestaurant.controller')

class GetRestaurantRoute extends Controller {
  constructor() {
    super()
    this.view = new View()
  }
  route() {
    return this.get('/get-restaurant', (req, res) => new GetRestaurantController().controller(req, res))
  }
}

module.exports = { GetRestaurantRoute }
