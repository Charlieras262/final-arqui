const mongoose = require('mongoose');
const { Schema } = mongoose;

// En este esquema se establece el modelo del Comercio
const ComercioSchema = new Schema({
  nombre: { type: String, required: true },
  tipo_servicio: { type: String, required: true },
  giro_negocio: { type: String, required: true },
  correo_electronico: { type: String, required: true }
});

module.exports = mongoose.model('Comercio', ComercioSchema);