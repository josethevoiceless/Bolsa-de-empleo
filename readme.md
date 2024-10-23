# Bolsa de Empleo con Funcionalidad de Red Social

## Descripción

Este proyecto es una aplicación para manejar una bolsa de empleo con un componente de red social. Los usuarios pueden buscar trabajos, interactuar entre sí, y recomendar oportunidades laborales. La estructura de la base de datos incluye tablas como Usuarios, Perfiles Profesionales, Empleos, Solicitudes de Empleo, Recomendaciones de Empleo, y Mensajes, todas diseñadas para soportar la funcionalidad del sistema.

## Estructura del Proyecto

- *database/*: Contiene la configuración, migraciones, y modelos de la base de datos, incluyendo las tablas mencionadas y sus relaciones. La base de datos está diseñada para permitir la interacción entre empleadores y candidatos, y soporta funcionalidades como recomendaciones y comunicación entre usuarios.
  
- *server/*: Contiene los archivos del servidor, incluyendo rutas y controladores para manejar las peticiones HTTP (GET, POST, PUT, DELETE) que permiten la interacción con la base de datos. Las funcionalidades incluyen la creación de usuarios, publicación de empleos, envío de solicitudes y recomendaciones, entre otros.

## Requisitos Previos

- [Node.js](https://nodejs.org/) - Versión 14 o superior
- [MySQL](https://www.mysql.com/) - Base de datos

## Instalación

1. Clonar este repositorio:
    bash
    git clone https://github.com/tu-usuario/mi-proyecto.git
    

2. Instalar las dependencias:
    bash
    npm install
    

3. Configurar la base de datos en database/config.js.

4. Ejecutar las migraciones:
    bash
    npx sequelize-cli db:migrate
    

5. Iniciar el servidor:
    bash
    node server/server.js
    

## Contribuir

1. Haz un fork del repositorio.
2. Crea una rama para tu característica (git checkout -b feature/nueva-caracteristica).
3. Haz commit de tus cambios (git commit -m 'Añadir nueva característica').
4. Sube tus cambios (git push origin feature/nueva-caracteristica).
5. Abre un Pull Request.

## Autores

- *Jose Muñoz* - Desarrollador Principal - [GitHub](https://github.com/josethevoiceless) 
- *Camilo Urrutia* - Contribuidor - [GitHub]( https://github.com/CamiloUrrutia023)
- *Colaborador 2* - Contribuidor - [GitHub](https://github.com/colaborador2)

## Licencia

Este proyecto está licenciado bajo la Licencia MIT - ver el archivo [LICENSE](LICENSE) para más detalles.