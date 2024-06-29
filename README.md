# Instalación y uso de repositorio backend

### 1. Clonar Repositorio a máquina local

```bash
git clone <repository-url>

```

### 2. Instalar Dependencias

```bash
npm install

```

### 3. Ejecutar El Servidor

```bash
nodemon index.js

```

##Rutas Programadas

### Rutas para administradores

Descripción: Obtener los productos de DummyJson.
Método: GET
URL: http://localhost:3000/products
Headers: No es necesario.
Body: No es necesario.

Descripción: Dar de alta producto en DummyJson.
Método: POST
URL: http://localhost:3000/products/
Headers: No es necesario.
Body: title, price.
Authorization: Bearer Token.

Descripción: Editar producto de DummyJson.
Método: UPDATE
URL: http://localhost:3000/products/update/'id'
Headers: No es necesario.
Body: title, price.
Authorization: Bearer Token.

Descripción: Eliminar producto de DummyJson.
Método: DELETE
URL: http://localhost:3000/products/delete/'id'
Headers: No es necesario.
Body: No es necesario.


### Rutas de Login

Descripción: Iniciar Sesión para obtener Token y saber el rol.
Método: POST
URL: http://localhost:3000/users/auth/login
Headers: No es necesario.
Body: username, password.




