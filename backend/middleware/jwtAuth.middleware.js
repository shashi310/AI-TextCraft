const jwt = require("jsonwebtoken");
require("dotenv").config();

const verify = async (req, res, next) => {
  try {
    // console.log(req.header("Auth"));
    const tkn = req.headers.authorization;
    const decoded = jwt.verify(tkn, process.env.secretKey);
    if (decoded) {
      req.body.userId = decoded.userID;
      // console.log(decoded);
      next();
    } else {
      res.status(400).send({ msg: "Something Went Wrong" });
    }
  } catch (error) {
    res.status(400).send({ verifyMsg: error.message });
  }
};

module.exports = { verify };
