import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const TournamentSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    description: String,
    authRequired: {
      type: Boolean,
      default: false,
    },
    format: {
      type: String,
      required: true,
    },
    duration: {
      type: String,
      required: true,
    },
    order: {
      type: Number,
      required: true,
    },
    entries: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Entry',
      },
    ],
  },
  {
    timestamps: true,
  }
);

export default mongoose.model('Tournament', TournamentSchema);

