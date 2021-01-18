'use strict'

class SessionController {
  async store ({ request, auth}){
    const { identifier, password } = request.all()

    const token = await auth.attempt(identifier, password)

    return token
  }
}

module.exports = SessionController
