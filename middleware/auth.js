const jwt = require("jsonwebtoken");

const authenticationMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new Error("Unauthorized user");
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const { email, password, name, city } = decoded;
    req.user = { email, password, name, city };
  } catch (error) {
    throw new Error("not authroized for this route");
  }
  next();
};

module.exports = authenticationMiddleware;
