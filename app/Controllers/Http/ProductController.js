'use strict'

const User = use('App/Models/User')
const Product = use('App/Models/Product')
const Database = use('Database')


class ProductController {
  async index({response}){
    try {
      const product = Product.all()
      return product;

    } catch (error) {
        return response.status(error.status).send({ error: { message: 'Ops! Ocorreu um erro ao Listar os usuários!'}})
    }
  }

  async myProducts({response, params, auth}){
    try {
      const id = params.id;

      const user = await User.query(id)

      .where('id', id)
      .select('id','username','identifier')
      .fetch()

      if(auth.user.id != params.id){
        return response.status(401).send({ error: 'Not authorized' })
      }else{
        const products = await Database.from('products').where('user_id', id).select('id','user_id','title', 'description', 'enabled')
        return {user, products}
      }
    } catch (error) {
      return response.status(error.status).send({ error: { message: 'Ops! Ocorreu um erro ao exibir os produtos deste usuário'}})
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

  async update ({params, request, response}){
    try {
      const product = await Product.findOrFail(params.id)

      const data = request.only(['title', 'description', 'enabled'])

      product.merge(data)

      await product.save()

      return product
    } catch (error) {
        return response.status(error.status).send({ error: { message: 'Ops! Ocorreu um erro ao atualizar este usuários!'}})
    }
  }

  async destroy({params, response}){
    try {
      const product = await Product.findOrFail(params.id)

      await product.delete()
      return response.status(200).send({ message: 'Produto removido com sucesso!'})
    } catch (error) {
      return response.status(error.status).send({ error: { message: 'Ops! Ocorreu um erro ao remover este produto'}})
    }
  }
}

module.exports = ProductController
