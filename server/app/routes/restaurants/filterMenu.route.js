const { Controller } = require('cores/Controller')
const { View } = require('cores/View')
const { FilterMenuController } = require('controllers/restaurants/filterMenu.controller')

class FilterMenuRoute extends Controller {
  constructor() {
    super()
    this.view = new View()
  }
  route() {
    return this.get('/filter-menu', (req, res) => new FilterMenuController().controller(req, res))
  }
}

module.exports = { FilterMenuRoute }
