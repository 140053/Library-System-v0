require('dotenv').config();

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
require('dotenv').config();
exports.up = function(knex) {
    return knex.schema.withSchema(process.env.DB_DATABASE).createTable('libman_patronlog', function (table) {
        table.increments('id').primary();
        table.string('pid', 255).notNullable();
        table.string('campus', 255).notNullable();
        table.string('section', 255).notNullable();       
        table.string('mode').notNullable();
        table.timestamp('reg_in').defaultTo(knex.fn.now());
        table.string('modeOut').nullable()
        table.timestamp('reg_out').nullable(); // Make reg_out nullable
    })
    .then(() => knex.raw(`
        CREATE TRIGGER update_reg_out BEFORE UPDATE ON libmanV0.libman_patronlog
        FOR EACH ROW
        BEGIN
            IF NEW.modeOut <> OLD.modeOut THEN
                SET NEW.reg_out = NOW();
            END IF;
        END;
    `));
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.withSchema(process.env.DB_DATABASE).dropTable('libman_patronlog');
};
