const Post = require("../models/Post");
const User = require("../models/User");

async function createPost(req, res, next) {
  try {
    const { author, content, hashtags } = req.body;

    if (!author || !content) {
      return res.status(400).json({
        message: "Author and content are required"
      });
    }

    const userExists = await User.findById(author);

    if (!userExists) {
      return res.status(404).json({
        message: "Author not found"
      });
    }

    const post = await Post.create({
      author,
      content,
      hashtags: hashtags || []
    });

    return res.status(201).json({
      message: "Post created successfully",
      post
    });
  } catch (error) {
    next(error);
  }
}

async function addComment(req, res, next) {
  try {
    const { id } = req.params;
    const { author, text } = req.body;

    if (!author || !text) {
      return res.status(400).json({
        message: "Author and text are required"
      });
    }

    const userExists = await User.findById(author);

    if (!userExists) {
      return res.status(404).json({
        message: "Comment author not found"
      });
    }

    const post = await Post.findByIdAndUpdate(
      id,
      {
        $push: {
          comments: {
            author,
            text,
            createdAt: new Date()
          }
        }
      },
      {
        new: true
      }
    )
      .populate("author", "name username")
      .populate("comments.author", "name username");

    if (!post) {
      return res.status(404).json({
        message: "Post not found"
      });
    }

    return res.status(201).json({
      message: "Comment added successfully",
      post
    });
  } catch (error) {
    next(error);
  }
}

async function getFeed(req, res, next) {
  try {
    const { hashtag } = req.query;

    const filter = {};

    if (hashtag) {
      filter.hashtags = hashtag.toLowerCase().replace("#", "").trim();
    }

    const posts = await Post.find(filter)
      .sort({ createdAt: -1 })
      .populate("author", "name username")
      .populate("comments.author", "name username")
      .lean();

    const feed = posts.map((post) => ({
      id: post._id,
      author: post.author,
      content: post.content,
      hashtags: post.hashtags,
      commentsCount: post.comments.length,
      likesCount: post.likes.length,
      comments: post.comments,
      createdAt: post.createdAt
    }));

    return res.status(200).json({
      total: feed.length,
      feed
    });
  } catch (error) {
    next(error);
  }
}

async function likePost(req, res, next) {
  try {
    const { id } = req.params;
    const { userId } = req.body;

    if (!userId) {
      return res.status(400).json({
        message: "User ID is required"
      });
    }

    const userExists = await User.findById(userId);

    if (!userExists) {
      return res.status(404).json({
        message: "User not found"
      });
    }

    const post = await Post.findByIdAndUpdate(
      id,
      {
        $addToSet: {
          likes: userId
        }
      },
      {
        new: true
      }
    );

    if (!post) {
      return res.status(404).json({
        message: "Post not found"
      });
    }

    return res.status(200).json({
      message: "Post liked successfully",
      likesCount: post.likes.length
    });
  } catch (error) {
    next(error);
  }
}

async function getTopHashtags(req, res, next) {
  try {
    const hashtags = await Post.aggregate([
      { $unwind: "$hashtags" },
      {
        $group: {
          _id: "$hashtags",
          count: { $sum: 1 }
        }
      },
      { $sort: { count: -1 } },
      { $limit: 10 },
      {
        $project: {
          _id: 0,
          hashtag: "$_id",
          count: 1
        }
      }
    ]);

    return res.status(200).json({
      hashtags
    });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  createPost,
  addComment,
  getFeed,
  likePost,
  getTopHashtags
};