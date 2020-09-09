module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.createTable(
      "request",
      {
        user_id: {
          type: Sequelize.INTEGER,
          references: {
            model: "user",
            key: "id"
          },
          allowNull: false
        },
        friend_id: {
          type: Sequelize.INTEGER,
          references: {
            model: "user",
            key: "id"
          },
          allowNull: false
        },
        created_at: {
          type: Sequelize.DATE,
          defaultValue: Sequelize.NOW
        }
      },
      {
        tableName: "request"
      }
    ),

  down: queryInterface =>
    queryInterface.sequelize.query(`
    DROP TABLE IF EXISTS "request" CASCADE
  `)
};
