const Router = require('express');
const UsuarioController = require('../controllers/usuarioController');
const autenticado = require("../middleware/autenticado.js")

const router = Router();

router.use(autenticado);

router.post('/usuarios', UsuarioController.cadastrar);
router.get('/usuarios', UsuarioController.buscarTodosUsuarios);
router.get('/usuarios/id/:id', UsuarioController.buscarUsuarioPorId);
router.put('/usuarios/id/:id', UsuarioController.editarUsuario);
router.delete('/usuarios/id/:id', UsuarioController.deletarUsuario);

module.exports = router;