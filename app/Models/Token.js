'use strict'

const Model = use('Model')

class Token extends Model {
  user () {
    return this.belongsTo('App/Models/User')
  }

  product () {
    return this.belongsTo('App/Models/Product')
  }

}

module.exports = Token
