import jwt from 'jsonwebtoken';

const protect = async (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) return res.status(401).json({ message: 'Unauthorized.' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.userId = decoded.userId;

    next();
  } catch (error) {
    console.log('Error protect Controller: ', error.message);
    return res.status(500).json({
      message: error.message,
    });
  }
};

export default protect;
