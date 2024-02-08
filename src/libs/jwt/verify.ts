import verify from "jsonwebtoken/verify";
const SESSION_JWT_SECRET = process.env.SESSION_JWT_SECRET;

const verifyJwt = (token) => {
  return new Promise((resolve) => {
    if (!token) {
      return resolve(null);
    }
    verify(token, SESSION_JWT_SECRET, function (_err, decoded) {
      resolve(decoded?.data || null);
    });
  });
};

export default verifyJwt;
