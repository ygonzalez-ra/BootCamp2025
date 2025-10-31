const sqlite3 = require('sqlite3').verbose();

// 'tasks.db' será un archivo que se creará en la misma carpeta
const db = new sqlite3.Database('./tasks.db', (err) => {
  if (err) {
    console.error(err.message);
  }
  console.log('Conectado a la base de datos tasks.db.');
});

// Crea la tabla "tareas" si no existe
db.run(`CREATE TABLE IF NOT EXISTS tareas (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  nombre TEXT NOT NULL,
  completada INTEGER DEFAULT 0
)`, (err) => {
  if (err) {
    console.error(err.message);
  }
  console.log("Tabla 'tareas' lista.");
});

module.exports = db;
