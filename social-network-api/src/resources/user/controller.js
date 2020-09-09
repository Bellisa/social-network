import BaseResponse from "../../middleware/base-response";
import UserService from "./service";
import authMiddleware from "../../middleware/auth";

export default class UserController extends BaseResponse {
    getUsersList = async (req, res) => {

        const { first_name, last_name, user_id } = req.query;
        try {
            const token = await authMiddleware.getToken(req);
            const login = (await authMiddleware.decode(token))['login'];
            const result = await UserService.getUsersList(login, first_name, last_name, user_id)
            this.response(null, res, result)
        } catch (e) {
            this.response(e, res, null)
        }
    }
}