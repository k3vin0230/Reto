var express = require('express');
var router = express.Router();
const jwt = require('jsonwebtoken');

//Clave secreta para cifrado
const JWT_SECRET = 'cl4v3';


// Usuarios simulados 
const users = [
  { id: 1, username: 'usuario', password: '123456', role: 'user' },
  { id: 2, username: 'admin', password: 'admin123', role: 'admin' }
];

/* GET users listing. */
router.post('/auth/login', function(req, res) {
  const { username, password } = req.body;

  // Buscar usuario en la lista simulada 
    const user = users.find(u => u.username === username && u.password === password);

  if (!user) {
      return res.status(401).json({ message: 'Usuario no encontrado o contraseña incorrecta' });
  }

    // Crear token JWT
    const token = jwt.sign({ userId: user.id, role: user.role }, JWT_SECRET, { expiresIn: '1h' });
      
    res.status(200).send('token: ' + token);
});

module.exports = router;
