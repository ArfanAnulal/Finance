import jwt from 'jsonwebtoken';

export const auth = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    if (!token) return res.status(401).json({ message: 'Unauthorized' });

    const decodedData = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decodedData?.id;
    req.userRole = decodedData?.role;

    next();
  } catch (error) {
    res.status(401).json({ message: 'Unauthorized' });
  }
};
