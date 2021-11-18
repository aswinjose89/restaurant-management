const { Model } = require('cores/Model')
const { registrationSchema } = require('models/registration.model')
const { CustomeMessage } = require('helpers/customeMessage')
const { Jwt } = require('libs/jwt')
var _ = require('underscore');

class AddRestaurantRatingController extends Model {
  constructor() {
    super()
    this.model = new Model(registrationSchema)
    this.jwt = new Jwt()
  }

  async controller(req, res, next) {
    const { model } = this
    let { name, rating } = req.body
    const registration = await model.findOne({ name })
    let total_user_rating= registration.total_user_rating+1
    rating= registration.rating+ rating
    let average_rating=rating/total_user_rating
    const { _id } = await model.findOneAndUpdate({ name }, { total_user_rating, rating, average_rating })
    const token = this.jwt.createToken({ _id, name }, { expiresIn: '1d', algorithm: 'HS384' })
    return new CustomeMessage(res).success(200, {
      response: {
        status: 'success',
        code: res.statusCode,
        method: req.method,
        message: 'Restaurant rating successully updated in database',
        access_token: token
      }
    })
  }
}

module.exports = { AddRestaurantRatingController }
