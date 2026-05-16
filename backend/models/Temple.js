import mongoose from "mongoose";

const templeSchema = new mongoose.Schema(
  {
    templeName: {
      type: String,
      required: true,
    },

    slug: {
      type: String,
      unique: true,
    },

    categories: [
      {
        type: String,
        enum: [
          "pilgrimage",
          "architecture",
          "heritage",
          "jyotirlinga",
          "char-dham",
          "shakti-peeth",
        ],
      },
    ],

    deity: {
      type: String,
    },

    state: {
      type: String,
    },

    city: {
      type: String,
    },

    history: {
      type: String,
    },

    architectureStyle: {
      type: String,
    },

    dynasty: {
      type: String,
    },

    builtYear: {
      type: String,
    },

    timings: {
      type: String,
    },

    location: {
      latitude: Number,
      longitude: Number,
    },

    festivals: [String],

    images: [String],

    featured: {
      type: Boolean,
      default: false,
    },

    dressCode: {
      type: String,
    },
    rating: {
      type: Number,
      default: 4.5,
    },
  },
  {
    timestamps: true,
  }
);

const Temple = mongoose.model("Temple", templeSchema);

export default Temple;