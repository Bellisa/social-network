module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.createTable(
      "user",
      {
        id: {
          type: Sequelize.INTEGER,
          autoIncrement: true,
          primaryKey: true
        },
        first_name: {
          type: Sequelize.STRING(100),
          allowNull: false
        },
        last_name: {
          type: Sequelize.STRING(100),
          allowNull: false
        },
        login: {
          type: Sequelize.STRING(120),
          allowNull: false,
          unique: true
        },
        password: {
          type: Sequelize.STRING,
          allowNull: false
        },
        avatar: {
          type: Sequelize.STRING,
          allowNull: true
        },
        created_at: {
          type: Sequelize.DATE,
          defaultValue: Sequelize.NOW
        }
      },
      {
        tableName: "user"
      }
    ),

  down: queryInterface => queryInterface.dropTable("user")
};
