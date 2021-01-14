'use strict'
const Model = use('Model')
const Hash = use('Hash')
class User extends Model {
  static boot () {
    super.boot()
    this.addHook('beforeSave', async (userInstance) => {
      if (userInstance.dirty.password) {
        userInstance.password = await Hash.make(userInstance.password)
      }
    })
  }
  token () {
    return this.hasMany('App/Models/Token')
  }

  user () {
    return this.belongsTo('App/Models/User')
  }

  product () {
    return this.belongsTo('App/Models/Product')
  }
}

module.exports = User
