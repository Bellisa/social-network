"use strict";

module.exports = {
  up: queryInterface =>
    queryInterface.bulkInsert("request", [
      {
        user_id: 5,
        friend_id: 7,
        created_at: new Date()
      },
      {
        user_id: 7,
        friend_id: 8,
        created_at: new Date()
      },
      {
        user_id: 7,
        friend_id: 2,
        created_at: new Date()
      }
    ]),

  down: queryInterface => queryInterface.bulkDelete("request", null, {})
};
