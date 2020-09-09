import Sequelize from "sequelize";
import { sequelize } from "../../services/sequelize";
import UserModel from "../user/db_model";

export default class FriendModel extends Sequelize.Model {
  static async approveRequestQuery(user_id, friend_id) {
    return sequelize.query(`
    START TRANSACTION;
      DELETE FROM "request" as r WHERE (r.user_id = :user_id and 
        r.friend_id = :friend_id ) OR (r.user_id = :friend_id and 
        r.friend_id = :user_id );

      INSERT INTO "friend" (user_id,friend_id) VALUES (:user_id, :friend_id);
  COMMIT;
    `, { replacements: { user_id, friend_id: +friend_id }, type: sequelize.QueryTypes.query });
  }

  static async DeleteFriend(user_id, friend_id) {
    return sequelize.query(` 
      DELETE FROM "friend" as r WHERE (r.user_id = :user_id and 
        r.friend_id = :friend_id ) OR (r.user_id = :friend_id and 
        r.friend_id = :user_id );
    `, { replacements: { user_id, friend_id: +friend_id }, type: sequelize.QueryTypes.query });
  }
  static async getFriendsQuery(user_id) {
    return sequelize.query(` 
      select 
        id,
        avatar,
        login,
        first_name,
        last_name,
        user_id ,
        friend_id 
        from "friend" 
        inner join "user" on (user_id = id and user_id<> :user_id)or (friend_id = id and friend_id<> :user_id)
        where user_id = :user_id or friend_id = :user_id
    `, { replacements: { user_id: +user_id }, type: sequelize.QueryTypes.SELECT });
  }
}
FriendModel.init(
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
    modelName: "friend"
  }
);
