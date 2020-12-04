/* eslint-disable no-unused-vars */
exports.up = (knex) =>
  knex.schema.createTable('schedules', (table) => {
    table.increments().primary();
    table.integer('doctor_id');
    table.datetime('schedule_date');
    table.boolean('scheduled_time');
    table.timestamps(true, true);

    table
      .foreign('doctor_id')
      .references('id')
      .inTable('doctors')
      .onDelete('CASCADE')
      .onUpdate('CASCADE');
  });

exports.down = (knex) => knex.schema.dropTable('appointments');
