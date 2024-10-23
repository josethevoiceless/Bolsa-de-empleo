const fs = require('fs');
const path = require('path');

// Ruta a la carpeta donde están los archivos de código
const folderPath = '/routes./src'; // Cambia a la carpeta donde están tus archivos

// Archivo de salida
const outputFilePath = './todosLosCodigos.txt';

// Función para leer todos los archivos .js y escribirlos en un archivo de texto
const recopilarCodigos = () => {
  fs.readdir(folderPath, (err, files) => {
    if (err) {
      return console.error('Error leyendo la carpeta:', err);
    }

    let allCode = '';

    files.forEach(file => {
      const filePath = path.join(folderPath, file);

      if (path.extname(file) === '.js') {
        const code = fs.readFileSync(filePath, 'utf-8');
        allCode += `\n// --- Código de ${file} ---\n\n${code}\n`;
      }
    });

    fs.writeFileSync(outputFilePath, allCode, 'utf-8');
    console.log(`Todos los archivos .js se han recopilado en ${outputFilePath}`);
  });
};

recopilarCodigos();
