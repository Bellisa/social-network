import Sequelize from "sequelize";
import { sequelize } from "../../services/sequelize";

export default class UserModel extends Sequelize.Model {
  static async getUsersList(login, first_name, last_name, user_id) {
    return sequelize.query(`
         select
            u.id,
            u.avatar,
            u.login,
            u.first_name,
            u.last_name,
            r.user_id as request_user_id,
            r.friend_id as request_friend_id,
            f.user_id as friend_user_id,
            f.friend_id as friend_friend_id
            from "user" u
            LEFT JOIN "request" r ON
            (u.id = r.user_id or u.id = r.friend_id ) and (r.user_id = :user_id or r.friend_id = :user_id)
            LEFT JOIN "friend" f ON
            (u.id = f.user_id or u.id = f.friend_id ) and (f.user_id = :user_id or f.friend_id = :user_id)
            where u.login <> :login and u.first_name ilike :first_name and u.last_name ilike :last_name
    `, { replacements: { login, first_name: `${first_name}%`, last_name: `${last_name}%`, user_id }, type: sequelize.QueryTypes.SELECT });
  }
}

UserModel.init(
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
    sequelize,
    modelName: "user"
  }
);
