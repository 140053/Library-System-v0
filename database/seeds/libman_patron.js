/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex('libman_patron').del()
  await knex('libman_patron').insert([
    { 
      id: 1,
      name: 'Roman, Kenneth B',
      address: "Pili Cam Sur", 
      Degree_Course: "BSA-ANSCI",
      User_Class: "Staff",
      Year_Level: "4rth",
      IDnum: 'PIL-00-0000',
      DAteApplied: "05-07-2018",
      DateExpired: "01-01-2050",
      email: "kenneth.roman@cbsua.edu.ph",
      gender: "Male",
      campus: "Pili",
      Bkloan: null,
      telephone: null,
      Overdue: null,
      remarks: null,
      suspended: null,
      tag: null
    }
  ]);
};
