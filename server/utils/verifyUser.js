import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  const token = req.cookies.new_token;

  if (!token) {
    res.status(401).json("Unauthorized");
  }

  jwt.verify(token, process.env.JWT, (err, user) => {
    if (err) {
      res.status(403).json("Forbidden");
    }

    req.user = user;
    next();
  });
};