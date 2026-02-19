import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  chefId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  chefName: { type: String, required: true },
  totalAmount: { type: Number, required: true },
  status: { 
    type: String, 
    enum: ['PLACED', 'ACCEPTED', 'REJECTED', 'COOKING', 'ONTHEWAY', 'DELIVERED', 'PREPARING', 'OUT_FOR_DELIVERY', 'CANCELLED'],
    default: 'PLACED' 
  },
  items: [{
    dishId: mongoose.Schema.Types.ObjectId,
    dishName: String,
    quantity: Number,
    price: Number
  }]
}, { timestamps: true });

export default mongoose.model('Order', orderSchema);
