const routes = module.exports = require('next-routes')()

routes
.add('home', '/', 'index')
.add('stop', '/stop', 'stop')
.add('blog', '/blog', 'blog')