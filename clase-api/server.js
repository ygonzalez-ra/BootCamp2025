const express = require('express');
const db = require('./database.js'); // Importa nuestra conexión a la BD
const app = express();
const port = 3000;

// Esto permite que el servidor entienda JSON (ej. cuando creamos una tarea)
app.use(express.json());

// ----- ENDPOINTS DE NUESTRA API -----

// Endpoint 1: LEER todas las tareas (CRUD: Read)
// Método: GET, Ruta: /api/tareas
app.get('/api/tareas', (req, res) => {
  const sql = "SELECT * FROM tareas";
  
  db.all(sql, [], (err, rows) => {
    if (err) {
      res.status(500).json({ "error": err.message });
      return;
    }
    // Devuelve un JSON con todas las tareas
    res.json({
      "message": "success",
      "data": rows
    });
  });
});

// Endpoint 2: CREAR una nueva tarea (CRUD: Create)
// Método: POST, Ruta: /api/tareas
app.post('/api/tareas', (req, res) => {
  // El nombre de la tarea vendrá en el "body" de la petición
  const { nombre } = req.body; 

  if (!nombre) {
    res.status(400).json({ "error": "Falta el 'nombre' de la tarea" });
    return;
  }

  const sql = "INSERT INTO tareas (nombre) VALUES (?)";
  db.run(sql, [nombre], function(err) {
    if (err) {
      res.status(500).json({ "error": err.message });
      return;
    }
    // Devuelve la tarea que se acaba de crear
    res.status(201).json({
      "message": "success",
      "data": { id: this.lastID, nombre: nombre, completada: 0 }
    });
  });
});


// ----- Fin de Endpoints -----

// Inicia el servidor
app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
