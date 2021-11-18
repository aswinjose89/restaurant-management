const { Controller } = require('cores/Controller')
const { View } = require('cores/View')
const { GetMenuController } = require('controllers/restaurants/getMenu.controller')

class GetMenuRoute extends Controller {
  constructor() {
    super()
    this.view = new View()
  }
  route() {
    return this.get('/get-menu', (req, res) => new GetMenuController().controller(req, res))
  }
}

module.exports = { GetMenuRoute }
