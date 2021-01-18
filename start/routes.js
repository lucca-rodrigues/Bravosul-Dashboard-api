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
  Route.get('/products/:id', 'ProductController.show')
  Route.post('/products', 'ProductController.store')
  Route.put('/products/:id', 'ProductController.update')
  Route.delete('/products/:id', 'ProductController.destroy')
}).middleware(['auth'])
