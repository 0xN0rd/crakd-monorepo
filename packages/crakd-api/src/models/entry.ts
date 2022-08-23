import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const EntrySchema = new Schema(
  {
    score: Number,
    position: Number,
    gamertag: String,
    platform: String,
    region: String,
    tournament: {
      type: Schema.Types.ObjectId,
      ref: 'Tournament',
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model('Entry', EntrySchema);
