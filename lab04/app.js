const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const app = express();
const port = 3000;

app.use(express.static(path.join(__dirname, 'public'))); //añadir el middleware

app.use(bodyParser.urlencoded({ extended: true })); //configurar el midleware para trabajar con los formularios

app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'public/html/index.html'));
});

app.post('/register', (req, res) => {
    var {title, fecha, hora, descripcion} = req.body;
    //se crea la ruta de direccion para los archivos
    const dirPath = path.join(__dirname, 'agenda', fecha);
    //verificacion adicional si no existe
    if (!fs.existsSync(dirPath)) {
        fs.mkdirSync(dirPath, { recursive: true });
    }
    var titulo = hora.replace(/:/g, '-');
    //Ruta del evento con su fecha como titulo
    const filePath = path.join(dirPath, `${titulo}.txt`);
    var fileContent = `Titulo del evento: ${title}\nFecha: ${fecha}\nHora: ${hora}\nDescripción: ${descripcion}`;

    fs.writeFile(filePath, fileContent, (err) => {
        if (err) {
            console.error(err);
            res.status(500).send('Error al registrar el evento');
        } else {
            res.status(200).send('Evento registrado exitosamente');
        }
    });

    console.log("Los parametros enviados son: ", title, " ", fecha, " ", hora, " ", descripcion);
});

app.listen(port, () => {
  console.log(`Escuchando en: http://localhost:${port}`);
});

//Generar el arbol de directorios como una lista
function generateTree(dir) {
    const stats = fs.statSync(dir);
    if (stats.isDirectory()) {
        const files = fs.readdirSync(dir);
        let tree = `<ul>${path.basename(dir)}\n`;
        files.forEach(file => {
            const filePath = path.join(dir, file);
            const fileStats = fs.statSync(filePath);
            if (fileStats.isFile()) {
                const content = fs.readFileSync(filePath, 'utf-8');
                const matches = content.match(/Titulo del evento: (.+)\nFecha: (.+)\nHora: (.+)\nDescripción: (.+)/);
                if (matches) {
                    const title = matches[1];
                    const fecha = matches[2];
                    const hora = matches[3];
                    const descripcion = matches[4];
                    tree += `<li>${title} - ${fecha} - ${hora} - ${descripcion}</li>\n`;
                } else {
                    tree += `<li>${file}</li>\n`;
                }
            } else if (fileStats.isDirectory()) {
                tree += `<li>${generateTree(filePath)}</li>\n`;
            }
        });
        tree += `</ul>`;
        return tree;
    } else {
        return path.basename(dir);
    }
}

//Funcion para enviar el arbol!
app.get('/agenda-tree', (req, res) => {
    const agendaDir = path.join(__dirname, 'agenda');
    const tree = generateTree(agendaDir);
    res.send(tree);
});
function generateDelete(dir) {
    const stats = fs.statSync(dir);
    if (stats.isDirectory()) {
        const files = fs.readdirSync(dir);
        let tree = `<ul>${path.basename(dir)}\n`;
        files.forEach(file => {
            const filePath = path.join(dir, file);
            const fileStats = fs.statSync(filePath);
            if (fileStats.isFile()) {
                const content = fs.readFileSync(filePath, 'utf-8');
                const matches = content.match(/Titulo del evento: (.+)\nFecha: (.+)\nHora: (.+)\nDescripción: (.+)/);
                if (!matches) {
                    return res.status(404).send('No se encontraron datos válidos en el archivo.');
                }
                const title = matches[1];
                const fecha = matches[2];
                const hora = matches[3];
                const descripcion = matches[4];

                tree += `<li>
                            ${title} - ${fecha} - ${hora} - ${descripcion}
                            <a href="/edit?file=${filePath}"><img src="../img/edit.png" width="50px"></a> | 
                            <a href="/delete?file=${filePath}"><img src="../img/delete.png" width="50px"></a>
                        </li>\n`;
            } else if (fileStats.isDirectory()) {
                tree += `<li>${generateDelete(filePath)}</li>\n`;
            }
        });
        tree += `</ul>`;
        tree += `<button onclick="closeEdit()" style="position: fixed;top: 10px;right: 10px; z-index: 9999;">Salir</button>`;
        return tree;
    } else {
        return path.basename(dir);
    }
}

app.get('/agenda-editar', (req, res) => {
    const agendaDir = path.join(__dirname, 'agenda');
    const tree = generateDelete(agendaDir);
    res.send(tree);
});

app.get('/edit', (req, res) => {
    console.log(req.query.file);
    const filePath = req.query.file; 
    if (!filePath) {
        return res.status(400).send('Ruta del archivo no proporcionada.');
    }

    fs.readFile(filePath, 'utf-8', (err, content) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Error al leer el archivo.');
        }

        const matches = content.match(/Titulo del evento: (.+)\nFecha: (.+)\nHora: (.+)\nDescripción: (.+)/);
        if (!matches) {
            return res.status(404).send('No se encontraron datos válidos en el archivo.');
        }

        const title = matches[1];
        const fecha = matches[2];
        const hora = matches[3];
        const descripcion = matches[4];
        res.send(`
            <div class="form-Edit">
                <form id="editForm" class="myForm" method="POST" action="/update?file=${encodeURIComponent(filePath)}">
                    <label for="title">Titulo del evento</label>
                    <br>
                    <input type="text" name="title" id="title2" value="${title}" readonly>
                    <br>
                    <label for="fecha">Fecha</label>
                    <br>
                    <input type="date" name="fecha" id="fecha2" value="${fecha}" readonly>
                    <br>
                    <label for="hora">Hora</label>
                    <br>
                    <input type="time" name="hora" id="hora2" value="${hora}" readonly>
                    <br>
                    <label for="descripcion">Descripción</label>
                    <br>
                    <textarea name="descripcion" rows="20" cols="20">${descripcion}</textarea>
                    <br>
                    <input type="submit" name="enviar" value="Actualizar evento">
                    <br>
                </form>
            </div>
        `);
    });
});

app.post('/update', (req, res) => {
    const { title, fecha, hora, descripcion } = req.body;
    const filePath = req.query.file;

    if (!filePath) {
        return res.status(400).send('Ruta del archivo no proporcionada.');
    }

    const newContent = `Titulo del evento: ${title}\nFecha: ${fecha}\nHora: ${hora}\nDescripción: ${descripcion}`;

    fs.writeFile(filePath, newContent, (err) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Error al actualizar el evento.');
        }
        res.redirect('/');
    });
});

app.get('/delete', (req, res) => {
    const filePath = req.query.file; 

    if (!filePath) {
        return res.status(400).send('Ruta del archivo no proporcionada.');
    }

    fs.unlink(filePath, (err) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Error al eliminar el archivo.');
        }

        res.redirect('/');
    });
});