const bodyParser = require('body-parser')
 
const produto = require('./produtoRoute.js')
const usuario = require('./usuariosRoute.js')
const auth = require('./authRoute.js')
const role = require('./role.js')
const permissao = require('./permissao')

module.exports = app => {
  app.use(
    bodyParser.json(),
      auth,
      usuario,
    produto,
  role,
      permissao
  )
}
