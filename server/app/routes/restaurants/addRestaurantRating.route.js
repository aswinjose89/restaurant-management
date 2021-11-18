const { Controller } = require('cores/Controller')
const { View } = require('cores/View')
const { AddRestaurantRatingController } = require('controllers/restaurants/addRestaurantRating.controller')

class AddRestaurantRatingRoute extends Controller {
  constructor() {
    super()
    this.view = new View()
  }
  route() {
    return this.post('/add-restaurant-rating', (req, res) => new AddRestaurantRatingController().controller(req, res))
  }
}

module.exports = { AddRestaurantRatingRoute }
