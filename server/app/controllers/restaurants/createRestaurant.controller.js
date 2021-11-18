const { Model } = require('cores/Model')
const { registrationSchema } = require('models/registration.model')
const { CustomeMessage } = require('helpers/customeMessage')
const { Jwt } = require('libs/jwt')
var _ = require('underscore');

class CreateRestaurantController extends Model {
  constructor() {
    super()
    this.model = new Model(registrationSchema)
    this.jwt = new Jwt()
  }

  async controller(req, res, next) {
    const { model } = this
    const { name, description, address, number } = req.body
    const registration = await model.findOne({ name })

    if (registration) {
      return new CustomeMessage(res).success(200, {
        response: {
          status: 'error',
          code: res.statusCode,
          method: req.method,
          message: 'Oops..data already exists in database',
          data: registration
        }
      })
    }

    const { _id } = await model.findOneAndCreate({ name, description, address, number })
    const token = this.jwt.createToken({ _id, name }, { expiresIn: '1d', algorithm: 'HS384' })
    return new CustomeMessage(res).success(200, {
      response: {
        status: 'success',
        code: res.statusCode,
        method: req.method,
        message: 'Yeah..data successfuly stored in database',
        access_token: token
      }
    })
  }
}

module.exports = { CreateRestaurantController }
