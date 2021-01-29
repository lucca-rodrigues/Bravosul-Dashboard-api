'use strict'

const User = use('App/Models/User')

class UserController {
  async index ({response}){
    try {
      const users = User.all()

      return (users)
    } catch (error) {
      return response.status(error.status).send({error: 'Ops! Ocorreu um erro ao listar os usuários'});
    }
  }

  async store ({request, response}){
    try {
      const data = request.only(['username', 'identifier', 'password'])

      const user = await User.create(data)

      return user
    } catch (error) {
      return response.status(error.status).send({ error: { message: 'Ops! Ocorreu um erro ao Criar este usuários!'}})
    }
  }

  async destroy({params, response}){
    try {
      const user = await User.findOrFail(params.id)

      await user.delete()
      return response.status(200).send({ message: 'Usuário removido com sucesso!'})
    } catch (error) {
      return response.status(error.status).send({ error: { message: 'Ops! Ocorreu um erro ao remover este usuário'}})
    }
  }
}

module.exports = UserController
