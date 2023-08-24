/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
require('dotenv').config();
exports.up = function(knex) {
    return knex.schema.withSchema(process.env.DB_DATABASE).createTable('libman_boardgames', function (table) {
        table.increments('id').primary();
        table.string('name', 255).notNullable();
        table.string('code', 255).notNullable();
        table.string('type', 255).notNullable();
        table.string('status', 100).notNullable();      
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.withSchema(process.env.DB_DATABASE).dropTable('libman_boardgames');
};
