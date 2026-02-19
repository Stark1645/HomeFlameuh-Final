import mongoose from 'mongoose';

const chefProfileSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  name: { type: String, required: true },
  cuisineSpecialty: { type: String, required: true },
  bio: { type: String, required: true },
  hygieneRating: { type: Number, default: 0 },
  verified: { type: Boolean, default: false },
  rating: { type: Number, default: 0 }
}, { timestamps: true });

export default mongoose.model('ChefProfile', chefProfileSchema);
