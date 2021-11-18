const { Controller } = require('cores/Controller')
const { View } = require('cores/View')
const { CreateRestaurantController } = require('controllers/restaurants/createRestaurant.controller')

class CreateRestaurantRoute extends Controller {
  constructor() {
    super()
    this.view = new View()
  }
  route() {
    return this.post('/create-restaurant', (req, res) => new CreateRestaurantController().controller(req, res))
  }
}

module.exports = { CreateRestaurantRoute }
