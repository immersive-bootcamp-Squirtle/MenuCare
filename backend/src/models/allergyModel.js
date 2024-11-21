const knex = require('../../db/knex')

module.exports = {
  async findAllAllergies() {
    return knex('allergy').select('*');
  }
}


