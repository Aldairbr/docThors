/* eslint-disable no-unused-vars */
exports.up = (knex) =>
  knex.schema.createTable('doctors', (table) => {
    table.increments().primary();
    table.integer('algo');
    table.string('name');
    table.string('email').unique();
    table.string('password');
    table.timestamps(true, true);
  });

exports.down = (knex) => knex.schema.dropTable('medicos');
