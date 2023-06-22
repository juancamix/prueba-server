import mongoose from "mongoose";

const horarioSchema = new mongoose.Schema({
  diaSemana: {
    type: String,
    required: true,
  },
  horaInicio: {
    type: String,
    required: true,
  },
  horaFin: {
    type: String,
    required: true,
  },
});

const canchaSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true,
  },
  ubicacion: {
    type: String,
    required: true,
  },
  precio: {
    type: Number,
    required: true,
  },
  tipo: {
    type: String,
    required: true,
  },
  disponible: {
    type: Boolean,
    default: true,
  },
  horarios: [horarioSchema],
  fotos: [
    {
      type: String,
    },
  ],
});

const Cancha = mongoose.model("Cancha", canchaSchema);

export default Cancha;
