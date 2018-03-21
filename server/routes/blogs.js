const express = require("express");
const router = express.Router();
const db = require("../db/models/index");

router.get("/", (req, res) => {
  db.Blog.findAll().then(blogs => {
    blogs ? res.status(200).json(blogs) : res.status(404).send("404 blogs not found");
  });
});

router.get("/featured", (req, res) => {
  db.Blog.findAll({
    where: {
      featured: true
    }
  }).then(blogs => {
    blogs ? res.status(200).json(blogs) : res.status(404).send("404 featured blogs not found");
  });
});

router.get("/:id", (req, res) => {
  let blogId = req.params.id;
  db.Blog.findById(blogId).then(blog => {
    blog ? res.status(200).json(blog) : res.status(404).send("404 blog not found");
  });
});

router.post("/", (req, res) => {
  req.body.AuthorId = req.query.authorId;
  db.Blog.create(req.body).then((blog, err) => {
    blog ? res.status(201).json(blog) : res.status(404).send(err);
  });
});

router.put("/:id", (req, res) => {
  let blogId = req.params.id;
  db.Blog.update(req.body, {
    where: {
      id: blogId
    }
  }).then(blog => {
    blog ? res.status(204).json(blog) : res.status(404).send("404 blog not updated");
  });
});

router.delete("/:id", (req, res) => {
  let blogId = req.params.id;
  db.Blog.destroy({
    where: {
      id: blogId
    }
  }).then(blog => {
    blog ? res.status(200).send("Blog deleted") : res.status(404).send("404 blog not deleted");
  });
});

module.exports = router;
