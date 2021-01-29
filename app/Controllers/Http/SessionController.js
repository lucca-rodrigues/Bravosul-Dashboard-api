'use strict'
const User = use('App/Models/User')
class SessionController {
  async store ({ request, auth}){
    const { identifier, password } = request.all()

    const token = await auth.attempt(identifier, password)

    const user = await User.query()
    .where('identifier', identifier)
    .with('user')
    .select('id','username','identifier')
    .fetch()

    return {token, user}
  }
}

module.exports = SessionController
