import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const EntrySchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    score: Number,
    position: Number,
    tournament: {
      type: Schema.Types.ObjectId,
      ref: 'Tournament',
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model('Entry', EntrySchema);
