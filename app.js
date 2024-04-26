const express = require('express');
const app = express();
let usuarios = require('./usersData');
const port = process.env.PORT || 3000;


function filtrarPorEspecialidad(usuarios, especialidades) {
    let usuariosPorEspecialidad = {};
    especialidades.forEach(especialidad => {
        usuariosPorEspecialidad[especialidad] = usuarios.filter(usuario => usuario.specialty === especialidad);
    });
    return usuariosPorEspecialidad;
}

const especialidades = ['marketing', 'developers', 'ventas', 'QAs'];
const usuariosFiltrados = filtrarPorEspecialidad(usuarios, especialidades);

// Routing

app.get('/', (req, res) => {
    let enlacesHTML = '<h1>Especialidades</h1>';
    especialidades.forEach(especialidad => {
        enlacesHTML += `<p><a href="/${especialidad}">${especialidad}</a></p>`;
    });
    res.send(enlacesHTML);
});

// Páginas para cada especialidad


especialidades.forEach(especialidad => {
    app.get(`/${especialidad}`, (req, res) => {
        let totalPersonas = usuariosFiltrados[especialidad].length;
        let usuariosHTML = `
            <h1>${especialidad.toUpperCase()}</h1>
            <p>Total de personas: ${totalPersonas}</p>
        `;
        usuariosFiltrados[especialidad].forEach(usuario => {
            usuariosHTML += `
                <div>
                    <h3>${usuario.name}</h2>
                    <p>Edad: ${usuario.age}</p>
                </div>
            `;
        });
        usuariosHTML += `<p><a href="/">Volver a la página principal</a></p>`;
        res.send(usuariosHTML);
    });
});

app.use((req, res) => {
    res.status(404).send('<h1>404</h1>');
});

app.listen(port, () => {
    console.log(`Node.js está escuchando en el puerto: ${port}`);
});


