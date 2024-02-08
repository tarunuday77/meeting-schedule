import sign from "jsonwebtoken/sign";
const SESSION_JWT_SECRET = process.env.SESSION_JWT_SECRET;

const signJwt = (data, options: { expiresIn?: any } = {}) => {
  const { expiresIn } = options;
  return sign(
    {
      data,
    },
    SESSION_JWT_SECRET,
    { expiresIn: expiresIn || 90 * 24 * 60 * 60 },
  );
};

export default signJwt;
