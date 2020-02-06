const express = require("express");
const { check, validationResult } = require("express-validator");
const router = express.Router();
const Todo = require("../../models/Todo");

// @route   POST api/todos
// @desc    Create a new todo
// @access  Public
router.post(
  "/",
  [
    check("text", "Todo is required")
      .not()
      .isEmpty()
  ],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const newTodo = new Todo({
        text: req.body.text
      });

      const todo = await newTodo.save();

      res.json(todo);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

// @route   GET api/todos
// @desc    Get all todos
// @access  Public
router.get("/", async (req, res) => {
  try {
    const todos = await Todo.find().sort({ date: -1 });

    res.json(todos);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route   DELETE api/todos/:id
// @desc    Delete a todo by id
// @access  Public
router.delete("/:id", async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id);
    if (!todo) {
      return res.status(404).json({ msg: "Todo not found" });
    }

    await todo.remove();
    res.json({ msg: "Todo deleted successfully" });
  } catch (err) {
    console.error(err.message);
    if (err.kind === "ObjectId") {
      return res.status(404).json({ msg: "Todo not found" });
    }
    res.status(500).send("Server Error");
  }
});

// @route   PUT api/todos/:id
// @desc    Toggle a todo as complete/incomplete
// @access  Public
router.put("/:id", async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id);
    if (!todo) {
      return res.status(404).json({ msg: "Todo not found" });
    }
    todo.complete = !todo.complete;
    await todo.save();
    res.json(todo);
  } catch (err) {
    console.error(err.message);
    if (err.kind === "ObjectId") {
      return res.status(404).json({ msg: "Todo not found" });
    }
    res.status(500).send("Server Error");
  }
});

module.exports = router;
