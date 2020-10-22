const Pedido = require('../models/Pedido');

exports.store = (req, res) => {
  let pedido = {};
  pedido.estado = req.body.estado;
  pedido.nuevo_estado = req.body.nuevo_estado;
  Pedido.create(pedido).then((id) => {
    if(req.xhr || req.headers.accept.indexOf('json') > -1) {
      Pedido.find(id).then((pedido) => res.json(pedido));
    } else {
      res.redirect('/pedido/all');
    }
  });
}

exports.showAll = (req, res) => {
  Pedido.all()
      .then((data) => {
          res.json({ data: data });
      });
}

exports.findById = (req,res) => {
    let id = req.params.id;
    Pedido.find(id)
      .then((data) => {
          return res.json({ data: data });
      });
  }

  exports.actualizaDrop = async (req, res) => {
    console.log("Llegue a actualiza", req.params)
    let pedido = {};
    pedido.id = (req.params.id);
    console.log("ID" + req.params.id);
    pedido.time = new Date();
  
    return await Pedido.actualiza(pedido)
      .then(() => {
        console.log("Pedido is done with id: ", pedido);
        res.json("Pedido done");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  exports.actualizaDrop2 = (req, res) => {
    console.log("Llegue a actualiza", req.body)
    let pedido = {};
    pedido.id = req.body.id;
    pedido.estado = req.body.estado;
    pedido.nuevo_estado = req.body.nuevo_estado;
    console.log("ID" + req.params.id);
    pedido.time = new Date();
  
    Pedido.actualiza(pedido).then((id) => {
      if(req.xhr || req.headers.accept.indexOf('json') > -1) {
        Pedido.find(id).then((pedido) => res.json(pedido));
      } else {
        res.redirect('/pedido/all');
      }
    });
  };