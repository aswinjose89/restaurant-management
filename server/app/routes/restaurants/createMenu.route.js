const { Controller } = require('cores/Controller')
const { View } = require('cores/View')
const { CreateMenuController } = require('controllers/restaurants/createMenu.controller')

class CreateMenuRoute extends Controller {
  constructor() {
    super()
    this.view = new View()
  }
  route() {
    return this.post('/create-menu', (req, res) => new CreateMenuController().controller(req, res))
  }
}

module.exports = { CreateMenuRoute }
