
exports.up = function(knex) {
    return knex.schema
      .createTable('pedido', (table) => {
        table.increments('id');
        table.string('estado', 255).notNullable();
        table.string('nuevo_estado', 255);
        table.timestamps(true, true);
      });
};

exports.down = function(knex) {
    return knex.schema
      .dropTable('pedido');
};
