'use strict'

const Route = use('Route')

Route.get('/', () => {
  return { Status: 'Ok, Api Only Bravosul' }
})

Route.get('/users', 'UserController.index');
Route.post('/users', 'UserController.store');
Route.post('/sessions', 'SessionController.store')

Route.get('/products', 'ProductController.index')

Route.group(() => {
  Route.post('/products', 'ProductController.store')
}).middleware(['auth'])
