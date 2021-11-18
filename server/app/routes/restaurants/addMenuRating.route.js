const { Controller } = require('cores/Controller')
const { View } = require('cores/View')
const { AddMenuRatingController } = require('controllers/restaurants/addMenuRating.controller')

class AddMenuRatingRoute extends Controller {
  constructor() {
    super()
    this.view = new View()
  }
  route() {
    return this.post('/add-menu-rating', (req, res) => new AddMenuRatingController().controller(req, res))
  }
}

module.exports = { AddMenuRatingRoute }
