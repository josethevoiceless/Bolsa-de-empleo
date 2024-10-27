// tests/testRecomendaciones.js
import fetch from 'node-fetch';

async function testRecomendaciones() {
  try {
    const API_URL = 'http://localhost:3006';

    // 1. Crear usuarios de prueba
    const usuario1 = await fetch(`${API_URL}/usuarios`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        nombre: "Usuario1",
        apellido: "Test",
        email: "usuario1@test.com",
        password: "password123",
        rol: "candidato"
      })
    }).then(res => res.json());

    const usuario2 = await fetch(`${API_URL}/usuarios`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        nombre: "Usuario2",
        apellido: "Test",
        email: "usuario2@test.com",
        password: "password123",
        rol: "candidato"
      })
    }).then(res => res.json());

    console.log('Usuarios creados:', { usuario1, usuario2 });

    // 2. Crear publicaciones
    const publicacion1 = await fetch(`${API_URL}/publicaciones`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        id_usuario: usuario1.id,
        contenido: "Publicación sobre desarrollo Frontend"
      })
    }).then(res => res.json());

    const publicacion2 = await fetch(`${API_URL}/publicaciones`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        id_usuario: usuario2.id,
        contenido: "Publicación sobre desarrollo Backend"
      })
    }).then(res => res.json());

    console.log('Publicaciones creadas:', { publicacion1, publicacion2 });

    // 3. Crear like
    const like = await fetch(`${API_URL}/likes`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        id_usuario: usuario2.id,
        idPublicacion: publicacion1.id
      })
    }).then(res => res.json());

    console.log('Like creado:', like);

    // 4. Crear un empleo de prueba
    const empleo = await fetch(`${API_URL}/empleos`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        titulo: "Desarrollador Backend",
        descripcion: "Remoto para Bogotá",
        salario: 50000,
        ubicacion: "Bogotá",
        tipo: "Tiempo completo"
      })
    }).then(res => res.json());

    console.log('Empleo creado:', empleo);

    // 5. Probar las recomendaciones
    console.log('\nProbando recomendaciones para usuario2...');
    const recomendaciones = await fetch(`${API_URL}/recomendaciones/${usuario2.id}`).then(res => res.json());
    console.log('Recomendaciones recibidas:', recomendaciones);

    // 6. Validar las recomendaciones
    console.log('\nAnalizando resultados:');
    console.log('- ¿Se recibieron recomendaciones?', recomendaciones.length > 0 ? 'Sí' : 'No');
    if (recomendaciones.length > 0) {
      console.log('- Número de recomendaciones:', recomendaciones.length);
      console.log('- Primera recomendación:', recomendaciones[0]);
    }

  } catch (error) {
    console.error('Error durante las pruebas:', error);
  }
}

// Ejecutar las pruebas
testRecomendaciones();