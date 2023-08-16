/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('libman_user').del()
  await knex('libman_user').insert([
    {id: 1, name: 'admin', email: 'admin@local.a', password: '$2b$10$oY0oWLbNYjmEU6u/BM8rKOwC9t2aob0VPj7by8U.b.oM3rFTXcxg6', auth: 'admin', campus: 'admin'}   
  ]);
};
