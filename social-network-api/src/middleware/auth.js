import BaseResponse from "./base-response";
import ValidationError  from "../response-errors/validation-error";



class AuthMiddleware extends BaseResponse {
    constructor() {
        super();
    }
    setStrategy= (authStrategy) => {
        this.authStrategy = authStrategy;
    }
    check = async (req, res, next) => {
        
        try {
            const resutChecking = await this.authStrategy.check(req, res, next);
            next();
        }
        catch (error) {
            this.response(error,res,null)
        }
    };
    
    getToken = async (req) => {
    return await this.authStrategy.getToken(req);
  };

   decode = async token => {
    return await this.authStrategy.decode(token);
   };
    
   generateToken = async (login, password) => {
    return await this.authStrategy.generateToken(login, password);
    };
}
let authMiddleware = null;
try{
     authMiddleware = new AuthMiddleware();
}
catch (er) {
    console.log('error',er)
}
export default authMiddleware;