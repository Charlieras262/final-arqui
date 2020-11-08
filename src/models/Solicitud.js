const mongoose = require('mongoose');
const { Schema } = mongoose;

// En este esquema se establece el modelo del Reserva
const SesionSchema = new Schema({
  user: { type: Schema.ObjectId, ref: 'User', required: true },
  comercio: { type: Schema.ObjectId, ref: 'Comercio', required: true },
  descripcion: { type: String, required: false },
  estado: { type: String, required: false, default: 'E' } // E A R
});

module.exports = mongoose.model('Sesiones', SesionSchema);