const express = require("express");

const {
  createPost,
  addComment,
  getFeed,
  likePost,
  getTopHashtags
} = require("../controllers/postController");

const router = express.Router();

router.post("/posts", createPost);
router.post("/posts/:id/comments", addComment);
router.get("/feed", getFeed);

router.post("/posts/:id/like", likePost);
router.get("/hashtags/top", getTopHashtags);

module.exports = router;