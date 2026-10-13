const express = require("express");
const sequelize = require("./db");
const Tarea = require("./models/Tarea");


const app = express();

app.use(express.json());

app.get("/", (req, res) => res.send("Node + Sequelize + PostgreSQL funcionando 🚀"));

app.get("/tareas", async (req, res) => {
  try {
    res.json(await Tarea.findAll({ order: [["id", "DESC"]] }));
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error al consultar" });
  }
});

app.post("/tareas", async (req, res) => {
  try {
    const tarea = await Tarea.create({ titulo: req.body.titulo });
    res.status(201).json(tarea);
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: err.message });
  }
});

const PORT = process.env.PORT || 8080;

(async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync(); // crea las tablas si no existen (ver nota sobre migraciones)
    app.listen(PORT, () => console.log(`Escuchando en puerto ${PORT}`));
  } catch (err) {
    console.error("No se pudo conectar a la BD:", err);
    process.exit(1);
  }
})();
