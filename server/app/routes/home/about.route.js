const { Controller } = require('cores/Controller')
const { View } = require('cores/View')

class AboutRoute extends Controller {
  constructor() {
    super()
    this.view = new View()
  }
  route() {
    const { view } = this
    return this.get('/about', (req, res) => {
      view.render(res, 'home.views/about', {
        title1: 'Follow Me in Github:',
        title2: 'aswinjose89@gmail.com',
        title3: 'Follow Me in Facebook:',
        title4: 'Aswin Jose'
      })
    })
  }
}

module.exports = { AboutRoute }
