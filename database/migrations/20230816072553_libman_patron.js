/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.withSchema(process.env.DB_DATABASE).createTable('libman_patron', function (table) {
        table.increments('id').primary();
        table.string('name', 255).notNullable();
        table.string('address', 255).notNullable();
        table.string('Degree_Course', 255).notNullable();
        table.string('User_Class', 100).notNullable();
        table.string('Year_Level', 100).notNullable();
        table.string('IDnum', 100).notNullable();
        table.string('DateApplied');
        table.string('DateExpired');
        table.string('email');
        table.string('gender');        
        table.string('campus', 255).notNullable()
        table.string('Bkloan');
        table.string('telephone');
        table.string('Overdue');
        table.string('remarks');
        table.string('suspended');
        table.string('tag');
        table.timestamp('reg_date').defaultTo(knex.fn.now());
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.withSchema(process.env.DB_DATABASE).dropTable('libman_patron');
};
