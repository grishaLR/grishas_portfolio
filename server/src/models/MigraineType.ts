import mongoose from 'mongoose';

const migraineTypeSchema = new mongoose.Schema({
  name: { type: String, required: true },
});

const MigraineType = mongoose.model('MigraineType', migraineTypeSchema);

export default MigraineType;
