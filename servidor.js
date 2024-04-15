const http = require('http');
const fs = require('fs');

const PORT = process.env.PORT || 3000;

// Datos ficticios de usuarios
const usuarios = [
    {
        id: 1,
        nombres: 'Juan',
        apellidos: 'Pérez',
        direccion: 'Calle Principal 123',
        correo: 'juan@example.com',
        dni: '12345678',
        edad: 30,
        fecha_creacion: '2024-04-18',
        telefono: '123-456-7890'
    },
    {
        id: 2,
        nombres: 'María',
        apellidos: 'González',
        direccion: 'Avenida Central 456',
        correo: 'maria@example.com',
        dni: '87654321',
        edad: 25,
        fecha_creacion: '2024-04-18',
        telefono: '987-654-3210'
    },
    {
        id: 3,
        nombres: 'Pedro',
        apellidos: 'Martínez',
        direccion: 'Plaza Mayor 789',
        correo: 'pedro@example.com',
        dni: '13579246',
        edad: 35,
        fecha_creacion: '2024-04-18',
        telefono: '456-789-0123'
    }
];

// Crear el servidor HTTP
const servidor = http.createServer((req, res) => {
    if (req.url === '/' && req.method === 'GET') {
        // Ruta principal: Servir una página HTML personalizada
        fs.readFile(__dirname + '/index.html', (err, data) => {
            if (err) {
                res.writeHead(500, { 'Content-Type': 'text/plain' });
                res.end('Error al cargar el archivo HTML');
            } else {
                res.writeHead(200, { 'Content-Type': 'text/html' });
                res.end(data);
            }
        });
    } else if (req.url === '/api/usuarios' && req.method === 'GET') {
        // Ruta para obtener la lista de usuarios
        const usuarioActual = usuarios.find((usuario) => usuario.nombres === 'Juan');
        if (usuarioActual) {
            // Mostrar mensaje personalizado para el usuario encontrado
            const mensaje = `Bienvenido a mi funval - API<br><br>Explora el mundo de la programación<br><br>${usuarioActual.nombres} ${usuarioActual.apellidos}<br><br><a href="/cambiar-usuario">Cambiar de usuario</a>`;
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end(mensaje);
        } else {
            // Usuario no encontrado
            res.writeHead(200, { 'Content-Type': 'text/plain' });
            res.end('No eres tú. Por favor, cambia de usuario.');
        }
    } else if (req.url === '/cambiar-usuario' && req.method === 'GET') {
        // Redireccionar al usuario a la ruta principal (/)
        res.writeHead(302, { 'Location': '/' });
        res.end();
    } else {
        // Ruta no encontrada
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('Ruta no encontrada');
    }
});

// Iniciar el servidor para escuchar en el puerto especificado
servidor.listen(PORT, () => {
    console.log(`Servidor iniciado en el puerto ${PORT}`);
});
