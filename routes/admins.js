var express = require('express');
var router = express.Router();
const axios = require('axios');

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
module.exports = router;
