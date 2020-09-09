"use strict";

module.exports = {
  up: queryInterface =>
    queryInterface.bulkInsert("friend", [
      {
        user_id: 7,
        friend_id: 1,
        created_at: new Date()
      }
    ]),

  down: queryInterface => queryInterface.bulkDelete("friend", null, {})
};
