const jwt = require("jsonwebtoken");
const config = require("config");

module.exports = function (req, res, next) {
  // get token from header
  const token = req.header("x-auth-token");

  // check if no token
  // res.status(402).json({msg: 'No token, authorization denied'});
  if (!token) {
    return res.status(401).json({ msg: "No token, authorization denied" });
  }

  try {
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    req.user = decoded.user;
    console.log("Token is valid:", token);
    next();
  } catch (error) { 
    console.error("Token is not valid", err.message);
    res.status(401).json({ msg: "Token is not Valid" });
  }
};
