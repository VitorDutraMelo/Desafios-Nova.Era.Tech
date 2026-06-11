const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema(
  {
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Comment author is required"]
    },
    text: {
      type: String,
      required: [true, "Comment text is required"],
      trim: true
    },
    createdAt: {
      type: Date,
      default: Date.now
    }
  },
  {
    _id: true
  }
);

const postSchema = new mongoose.Schema(
  {
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Post author is required"]
    },
    content: {
      type: String,
      required: [true, "Post content is required"],
      trim: true
    },
    hashtags: {
      type: [String],
      default: [],
      set: (hashtags) =>
        hashtags.map((tag) =>
          tag.toLowerCase().replace("#", "").trim()
        )
    },
    comments: {
      type: [commentSchema],
      default: []
    },
    likes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
      }
    ]
  },
  {
    timestamps: true
  }
);

postSchema.index({ createdAt: -1 });
postSchema.index({ hashtags: 1 });

module.exports = mongoose.model("Post", postSchema);