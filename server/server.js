const express = require('express');
const app = express();

app.get('/', (req, res) => {
    res.send('Servidor funcionando correctamente');
});

app.listen(3000, () => {
    console.log('Servidor corriendo en el puerto 3000');
    console.log('Visita http://localhost:3000 para verificar la conexión');
});