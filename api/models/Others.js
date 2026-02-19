import mongoose from 'mongoose';

export const ContactMessage = mongoose.model('ContactMessage', new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  message: { type: String, required: true }
}, { timestamps: true }));

export const Subscription = mongoose.model('Subscription', new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  chefId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  chefName: { type: String, required: true },
  planType: { type: String, enum: ['WEEKLY', 'MONTHLY'], required: true },
  startDate: { type: Date, default: Date.now },
  active: { type: Boolean, default: true }
}, { timestamps: true }));
