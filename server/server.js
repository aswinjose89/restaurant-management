require('module-alias/register')
const http = require('http')
const { app } = require('./app')
const { Route } = require('./core/Route')

class App extends Route {
  init() {
    //init default route
    app.use(super.init())
    
    // listening server port
    http.createServer(app).listen(process.env.PORT)   
    console.log('Server started running on port:', process.env.PORT);  
  }
}

new App().init()