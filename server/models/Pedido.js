const knex = require('../database/connection');

exports.PENDING = 'pending';
exports.DONE = 'done';

exports.all = () => {
  return knex
    .select('*')
    .from('pedido');
}

exports.create = (pedido) => {
  return knex('pedido')
    .insert({ estado: pedido.estado, nuevo_estado: pedido.nuevo_estado });
}

exports.find = (id) => {
  return knex
    .select('*')
    .from('pedido')
    .where('id',id)
    .first()
}

exports.actualiza = (pedido) => {
  return knex('pedido')
  .where({ id: pedido.id })
  .update({ 
            nuevo_estado: pedido.nuevo_estado,
            time_status: pedido.time
          })
}

// exports.changeStatus = (pedido) => {
//   return knex('pedido')
//     .where('id', pedido.id)
//     .update({nuevo_estado: pedido.estado});
    
// }