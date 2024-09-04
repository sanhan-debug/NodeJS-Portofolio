import path from "path";
import jwt from "jsonwebtoken";

export const authMiddleware = async (req, res, next) => {
  const { token } = req.params;
  jwt.verify(token,process.env.SECRET_KEY, (err, decode) => {
    if (err) {
      res.sendFile(path.resolve("./views/loginerror.html"));
    } else {
      req.user = decode.user;
      next();
    }
  });
};


export const authenticateUser = (req, res, next) => {
  const token = req.header('Authorization').replace('Bearer ', '');

  try {
      const decoded = jwt.verify(token, process.env.SECRET_KEY);
      req.user = decoded;
      next();
  } catch (error) {
      res.status(401).send({ error: 'Zəhmət olmasa daxil olun.' });
  }
};
