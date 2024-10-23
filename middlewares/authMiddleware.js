import jwt from 'jsonwebtoken';

// Middleware para autenticar el token JWT
export const authenticateToken = (req, res, next) => {
  const token = req.header('Authorization');
  if (!token) return res.status(401).json({ message: 'Acceso denegado, token no proporcionado' });

  try {
    const verified = jwt.verify(token, 'SECRET_KEY');
    req.user = verified;
    next();
  } catch (error) {
    res.status(403).json({ message: 'Token inválido' });
  }
};

