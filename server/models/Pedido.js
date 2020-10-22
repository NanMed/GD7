const knex = require('../database/connection');

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
            estado: pedido.estado,
            nuevo_estado: pedido.nuevo_estado,
            updated_at: pedido.time
          })
}