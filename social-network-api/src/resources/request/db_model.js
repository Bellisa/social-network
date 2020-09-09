import Sequelize from "sequelize";
import { sequelize } from "../../services/sequelize";
import UserModel from "../user/db_model";

export default class RequestModel extends Sequelize.Model {
  static async getPendingRequestsQuery(user_id) {
    return sequelize.query(` 
    select 
      id,
      avatar,
      login,
      first_name,
      last_name,
      user_id ,
      friend_id 
      from "request" 
      inner join "user" on (friend_id = id)
 where user_id = :user_id 
    `, { replacements: { user_id: +user_id }, type: sequelize.QueryTypes.SELECT });
  }
  static async getIncomingRequestsQuery(user_id) {
    return sequelize.query(` 
    select 
      id,
      avatar,
      login,
      first_name,
      last_name,
      user_id ,
      friend_id 
      from "request" 
      inner join "user" on (user_id = id)
 where friend_id =:user_id
      
    `, { replacements: { user_id: +user_id }, type: sequelize.QueryTypes.SELECT });
  }
}

RequestModel.init(
  {
    user_id: {
      type: Sequelize.NUMBER,
      primaryKey: true,
      references: {
        model: UserModel,
        key: "id"
      },
      allowNull: false
    },
    friend_id: {
      type: Sequelize.NUMBER,
      primaryKey: true,
      references: {
        model: UserModel,
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
    sequelize,
    modelName: "request"
  }
);
