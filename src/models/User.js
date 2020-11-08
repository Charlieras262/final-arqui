const mongoose = require('mongoose');
const { Schema } = mongoose;

// En este esquema se establece el modelo del Usuario
const UserSchema = new Schema({
  username: { type: String, requere: true},
  nombre: { type: String, required: true },
  apellido: { type: String, required: true },
  correo: { type: String, required: true },
  telefono: { type: String, required: true },
  fecha_nacimiento: { type: String, required: true },
  role: { type: String, required: true },
  clave: { type: String, required: true },
  salt: { type: String, required: true }
});

// Se exporta el esquema como un modelo para utilizarlo en el controllador
const User = module.exports = mongoose.model('User', UserSchema);

module.exports.getUserByUsername = (username, callback) => {
  const query = {
    username: username
  }
  User.findOne(query, callback);
}