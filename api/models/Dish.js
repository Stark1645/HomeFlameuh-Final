import mongoose from 'mongoose';

const dishSchema = new mongoose.Schema({
  chefId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  ingredients: { type: String, required: true },
  available: { type: Boolean, default: true },
  approved: { type: Boolean, default: false }
}, { timestamps: true });

export default mongoose.model('Dish', dishSchema);
