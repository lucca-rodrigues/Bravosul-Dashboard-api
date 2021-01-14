'use strict'

const Route = use('Route')

Route.get('/', () => {
  return { Status: 'Ok, Api Only' }
})

Route.get('/users', 'UserController.index');
Route.post('/users', 'UserController.store');
Route.post('/sessions', 'SessionController.store')


