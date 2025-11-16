const jwt = require("jsonwebtoken");
const SECRET  = process.env.SECRET;

function AuthMiddleware(req, res, next) {
  try {
    const token = req.cookies();
    // const token = req.headers.authorization;
    const payload = jwt.verify(token, SECRET);
    req.user_id = payload.user_id;
    req.userType = payload.userType;
    next();
  } catch (error) {
    next();
  }
}

module.exports = {
  Auth: AuthMiddleware,
};
