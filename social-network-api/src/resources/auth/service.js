import UserModel from "../user/db_model";

export default class AuthService {
  static async login(login, password) {
    try {
      const user = await UserModel.findOne({
        where: { login, password },
        attributes: ["id", "avatar", "first_name", "last_name", "login"]
      });
      return user;
    } catch (e) {
      throw Error(e);
    }
  }
  static async verify(login, password) {
    try {
      const user = await UserModel.findOne({
        where: { login: login, password: password },
        attributes: ["id"]
      });
      if (user)
        return true;
      return false;
    } catch (e) {
      throw Error(e);
    }
  }
}
