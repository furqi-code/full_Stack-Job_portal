const jwt = require("jsonwebtoken");
const SECRET  = process.env.SECRET;

function AuthMiddleware(req, res, next) {
  try {
    const token = req.cookies.token;
    const payload = jwt.verify(token, SECRET);
    req.user_id = payload.user_id;
    req.user_type = payload.user_type;
    console.log("middleware userType ", user_type);
    next();
  } catch (error) {
    next();
  }
}

module.exports = {
  Auth: AuthMiddleware,
};
