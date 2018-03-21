const express = require("express");
const router = express.Router();
const db = require("../db/models/index");

router.get("/", (req, res) => {
  db.Author.findAll().then(authors => {
    authors ? res.status(200).json(authors) : res.status(404).send("404 authors not found");
  });
});

router.get("/:id", (req, res) => {
  let reqId = req.params.id;
  db.Author.findById(reqId).then(author => {
    author ? res.status(200).json(author) : res.status(404).send("404 author not found");
  });
});

router.get("/:id/blogs", (req, res) => {
  let reqId = req.params.id;
  db.Blog.findAll({
    where: {
      authorId: reqId
    }
  }).then(blog => {
    blog ? res.status(200).json(blog) : res.status(404).send("404 blog not found");
  });
});

router.post("/", (req, res) => {
  db.Author.create(req.body).then((author, err) => {
    author ? res.status(201).json(author) : res.status(404).send(err);
  });
});

router.put("/:id", (req, res) => {
  let reqId = req.params.id;
  db.Author.update(req.body, {
    where: {
      id: reqId
    }
  }).then(author => {
    author ? res.status(204).json(author) : res.status(404).send("404 author not found");
  });
});

router.delete("/:id", (req, res) => {
  let reqId = req.params.id;
  db.Author.destroy({
    where: {
      id: reqId
    }
  }).then(author => {
    author ? res.status(200).send("Author deleted") : res.status(404).send("404 author not found");
  });
});

module.exports = router;
