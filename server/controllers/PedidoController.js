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

// exports.changeStatus = (req,res) => {
//   let id = req.params.id;
//   Task.find(id)
//     .then((data) => {
//       if(req.xhr || req.headers.accept.indexOf('json') > -1){
//         return res.json(), Task.changeStatus(data);
//       } else {
//         res.redirect('/');
//       }
//     });
// }

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