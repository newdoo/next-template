const routes = module.exports = require('next-routes')()

routes
.add('home', '/', 'index')
.add('stop', '/stop', 'stop')
.add('ListPage', '/list', 'ListPage')
.add('PostPage', '/post', 'PostPage')
.add('EditorPage', '/editor', 'EditorPage')