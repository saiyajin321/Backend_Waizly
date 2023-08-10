'use strict';

const { hashedPassword } = require('../helper/bcrypt');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
   const user = require("../data/user.json")
   user.forEach((el)=>{
    el.createdAt = el.updatedAt = new Date()
    el.password = hashedPassword(el.password)
   })
   await queryInterface.bulkInsert('Users', user, {})
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Users', user, {})
  }
};
