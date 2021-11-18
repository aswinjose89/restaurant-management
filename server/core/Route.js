//route home
const { HomeRoute } = require('routes/home/home.route')
const { AboutRoute } = require('routes/home/about.route')

//route Restaurant
const { CreateRestaurantRoute } = require('routes/restaurants/createRestaurant.route')
const { CreateMenuRoute } = require('routes/restaurants/createMenu.route')
const { GetRestaurantRoute } = require('routes/restaurants/getRestaurant.route')
const { GetMenuRoute } = require('routes/restaurants/getMenu.route')
const { FilterMenuRoute } = require('routes/restaurants/filterMenu.route')
const { AddRestaurantRatingRoute } = require('routes/restaurants/addRestaurantRating.route')
const { AddMenuRatingRoute } = require('routes/restaurants/addMenuRating.route')

class Route {
  init() {
    return [
      //init home route
      new HomeRoute().route(),
      new AboutRoute().route(),

      //Restaurant
      new CreateRestaurantRoute().route(),
      new CreateMenuRoute().route(),
      new GetRestaurantRoute().route(),
      new GetMenuRoute().route(),
      new FilterMenuRoute().route(),
      new AddRestaurantRatingRoute().route(),
      new AddMenuRatingRoute().route()
    ]
  }
}

module.exports = { Route }
