const routes = module.exports = require('next-routes')()

routes
.add('home', '/', 'index')
.add('stop', '/stop', 'stop')
.add('ListPage1', '/list', 'ListPage')
.add('ListPage2','/page/:page','ListPage')
.add('ListPage3','/tag/:tag/:page','ListPage')
.add('PostPage', '/post/:id', 'PostPage')
.add('EditorPage', '/editor', 'EditorPage')