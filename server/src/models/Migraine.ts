import mongoose from 'mongoose';

const migraineSchema = new mongoose.Schema({
  date_started: { type: Date, required: true },
  date_ended: { type: Date, required: true },
  name: { type: String, default: null },
  type: { type: mongoose.Schema.Types.ObjectId, ref: 'MigraineType', required: true },
});

const Migraine = mongoose.model('Migraine', migraineSchema);

export default Migraine;
