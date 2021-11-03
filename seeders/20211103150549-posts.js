'use strict';
const faker = require('faker');
const db = require('../models');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const posts = []

    const allUsers = await db.User.findAll();

    for (let i = 0; i < 50; i++){
      const userId = Math.floor(Math.random() * (allUsers.length - 1));
      posts.push({
        userId: userId,
        body: faker.lorem.sentence(),
        title: faker.lorem.paragraphs(),
        createdAt: new Date(),
        updatedAt: new Date()
      })
    }

      await queryInterface.bulkInsert('Posts', posts, {});
    
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
