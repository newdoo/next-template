const routes = module.exports = require('next-routes')()

routes
.add('home', '/', 'index')
.add('ingame', '/inGame', 'inGame')