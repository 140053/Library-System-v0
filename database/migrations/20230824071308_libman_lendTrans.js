/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
require('dotenv').config();
exports.up = function(knex) {
    return knex.schema.withSchema(process.env.DB_DATABASE).createTable('libman_lendTrans', function (table) {
        table.increments('id').primary();
        table.string('idnum', 255).notNullable();
        table.string('action', 255).notNullable();
        table.string('type', 255).notNullable();
        table.string('tname', 100).notNullable();
        table.string('tcode', 255).notNullable()
        table.timestamp('reg_date').defaultTo(knex.fn.now());
        table.timestamp('reg_return').nullable();
    })
    .then(() => knex.raw(`
        CREATE TRIGGER reg_return BEFORE UPDATE ON libmanV0.libman_lendTrans
        FOR EACH ROW
        BEGIN
            IF NEW.action <> OLD.action THEN
                SET NEW.reg_return = NOW();
            END IF;
        END;
    `));
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.withSchema(process.env.DB_DATABASE).dropTable('libman_lendTrans');
};
