'use strict'

const User = use('App/Models/User')
const Product = use('App/Models/Product')
const Database = use('Database')


class ProductController {
  async index({}){
    try {
      const product = Product.all()
      return product;

    } catch (error) {
        return response.status(error.status).send({ error: { message: 'Ops! Ocorreu um erro ao Listar os usuários!'}})
    }
  }

  async store({request, response, auth}){
    try {
      const data = request.only(['title', 'description', 'enabled'])

      const product = await Product.create({...data, user_id: auth.user.id})

      return product;
    } catch (error) {
        return response.status(error.status).send({ error: { message: 'Ops! Ocorreu um erro ao cadastrar transação'}})
    }
  }
}

module.exports = ProductController
