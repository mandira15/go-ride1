import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide a name'],
  },
  email: {
    type: String,
    required: [true, 'Please provide an email'],
    unique: true,
  },
  password: {
    type: String,
    required: [true, 'Please provide a password'],
  },
  userType: {
    type: String,
    enum: ['passenger', 'driver'],
    required: true
  },
  // Driver specific fields
  vehicle: {
    type: {
      model: String,
      number: String,
      capacity: Number
    },
    required: function() { return this.userType === 'driver' }
  },
  currentLocation: {
    type: {
      type: String,
      enum: ['Point'],
      default: 'Point'
    },
    coordinates: {
      type: [Number],
      default: [0, 0]
    }
  },
  rating: {
    type: Number,
    default: 0
  },
  totalRides: {
    type: Number,
    default: 0
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

UserSchema.index({ currentLocation: '2dsphere' });

export default mongoose.models.User || mongoose.model('User', UserSchema);