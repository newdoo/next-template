const routes = module.exports = require('next-routes')()

routes
.add('home', '/', 'index')
.add('bustabit','/bustabit','BustaPage')
.add('list', '/list', 'ListPage')
.add('ListPage2','/page/:page','ListPage')
.add('ListPage3','/tag/:tag/:page','ListPage')
.add('post', '/post/:id', 'PostPage')
.add('editor', '/editor', 'EditorPage')
.add('test', '/test', 'TestPage')
