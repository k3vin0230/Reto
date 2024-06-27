var express = require('express');
var router = express.Router();
const axios = require('axios');
const jwt = require('jsonwebtoken');
const JWT_SECRET = 'cl4v3'; 

// URL de la API de DummyJSON para los productos
const DUMMYJSON_API = 'https://dummyjson.com/products';

// Función para obtener datos de productos de DummyJSON
async function BuscarproductosDummy() {
  try {
      const response = await axios.get(DUMMYJSON_API);
      return response.data;
  } catch (error) {
      console.error('Error al obtener productos de DummyJSON:', error.message);
      throw error;
  }
}


let products = [];


// Ruta para obtener todos los productos
router.get('/products', async (req, res) => {
  try {
      // Obtener datos de productos desde DummyJSON
      products = await BuscarproductosDummy();
      res.json(products);
  } catch (error) {
      res.status(500).json({ message: 'Error al obtener productos desde DummyJSON' });
  }
});

// Ruta para crear un nuevo producto (solo para administradores)
router.post('/products',verifyTokenAndAdmin, async (req, res) => {
  const { title, price } = req.body;
  try {
      // Crear un nuevo producto en DummyJSON
      const newProduct = { title, price };
      const response = await axios.post(DUMMYJSON_API+'/add', newProduct);
      products.push(response.data);
      res.status(201).json(response.data);
  } catch (error) {
      res.status(500).json({ message: 'Error al crear un nuevo producto en DummyJSON' });
  }
});

// Ruta para EDITA un producto (solo para administradores)
router.put('/update/products/:id',verifyTokenAndAdmin, async (req, res) => {
  const { id } = req.params;
  const { title, price } = req.body;
  try {
  
      const updateProduct = { title, price };
      const response = await axios.put(`${DUMMYJSON_API}/${id}`, updateProduct);
      products.push(response.data);
      res.status(201).json(response.data);
  } catch (error) {
      res.status(500).json({ message: 'Error al editar el producto en DummyJSON' });
  }
});

// Ruta para ELIMINAR un producto (solo para administradores)
router.delete('/delete/products/:id',verifyTokenAndAdmin, async (req, res) => {
  const { id } = req.params;
  try {
  
      const response = await axios.delete(`${DUMMYJSON_API}/${id}`);
      products.push(response.data);
      res.status(201).json(response.data);
  } catch (error) {
      res.status(500).json({ message: 'Error al eliminar el producto en DummyJSON' });
  }
});





// Middleware para verificar el token JWT y el rol de administrador
function verifyTokenAndAdmin(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
      return res.status(401).json({ message: 'Token no proporcionado' });
  }

  const token = authHeader.split(' ')[1];  // Asumiendo el formato 'Bearer <token>'

  jwt.verify(token, JWT_SECRET, (err, decoded) => {
      if (err) {
          return res.status(403).json({ message: 'Token inválido' });
      }

      // Verificar si el usuario es administrador
      if (decoded.role !== 'admin') {
          return res.status(403).json({ message: 'Acceso no autorizado para crear productos' });
      }

      // Almacenar la información decodificada del usuario para su uso posterior si es necesario
      req.user = decoded;
      next();
  });
}

module.exports = router;
