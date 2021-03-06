var express = require('express');
const cors = require('cors');
const PedidoController = require('../controllers/PedidoController');
const PedidoModel = require('../models/Pedido');

var router = express.Router();

router.get('/pedido/all', PedidoController.showAll);
router.post('/pedido/add', PedidoController.store);
router.get('/pedido/:id', PedidoController.findById);
router.post('/pedido/actualiza', PedidoController.actualizaDrop2);

module.exports = router;