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

  async show ({ params, response }) {
    try {
      const product = await Product.findOrFail(params.id)
      return product
    } catch (error) {
      return response.status(error.status).send({ error: { message: 'Ops! Ocorreu um erro ao exibir os detalhes deste produto'}})
    }
  }

  async store({request, response, auth}){
    try {
      const data = request.only(['title', 'description', 'enabled'])

      const product = await Product.create({...data, user_id: auth.user.id})

      return product;
    } catch (error) {
        return response.status(error.status).send({ error: { message: 'Ops! Ocorreu um erro ao cadastrar produto'}})
    }
  }

  async destroy({}){
    try {
      const product = await Product.findOrFail(params.id)

      await product.delete()
      return response.status(200).send({ message: 'Produto removido com sucesso!'})
    } catch (error) {
      return response.status(error.status).send({ error: { message: 'Ops! Ocorreu um erro ao remover esta transação'}})
    }
  }
}

module.exports = ProductController
