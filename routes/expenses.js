const express = require("express");
const Expense = require("../models/Expense");
const User = require("../models/User");
const fetchUser = require("../middleware/fetchUser");
const { body, validationResult } = require("express-validator");
const router = express.Router();

//Route 1- Fetch all expenses
router.get("/fetchexpense", fetchUser, async (req, res) => {
  const expenses = await Expense.find({ user: req.user.id });
  res.send(expenses);
});

//Route 2- Add an expense
router.post(
  "/addexpense",
  fetchUser,
  [
    body("title", "Enter valid title").isLength({ min: 3 }),
    body("amount", "Amount can't be empty").exists(),
  ],
  async (req, res) => {
    let success = false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ success, error: errors.array() });
    }
    try {
      const { title, description, amount } = req.body;
      const newExpense = new Expense({
        user: req.user.id,
        title,
        description,
        amount,
      });
      const saveExpense = await newExpense.save();
      success = true;
      res.json({ success, saveExpense });
    } catch (error) {
      console.log(error);
      res.status(500).json({ success, error: "Internal Server Error" });
    }
  }
);

//Update an expense
router.put("/updateexpense/:id", fetchUser, async (req, res) => {
  let success = false;

  try {
    const expense = await Expense.findById(req.params.id);
    if(!expense) {
        return res.status(404).json({ success, error: "Expense not found"})
    }
    if (req.user.id != expense.user.toString()) {
      return res
        .status(401)
        .json({ success, error: "You don't have access to edit this note" });
    }
    const newExpense = {};
    const { title, description, amount } = req.body;
    if (title) newExpense.title = title;
    if (description) newExpense.description = description;
    if (amount) newExpense.amount = amount;

    const updatedExpense = await Expense.findByIdAndUpdate(
      req.params.id,
      { $set: newExpense },
      { new: true }
    );
    success = true;
    res.json({ success, updatedExpense });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success, error: "Internal Server Error" });
  }
});

//Route 4- Delete existing expense
router.delete("/deleteexpense/:id", fetchUser, async (req, res) => {
  let success = false;
  try {
    const expense = await Expense.findById(req.params.id);
    if(!expense) {
        return res.status(404).json({ success, error: "Expense not found"})
    }
    if (expense.user.toString() != req.user.id) {
      return res
        .status(401)
        .json({ success, error: "You don't have access to delete this note" });
    }
    const deleteExpense = await Expense.findByIdAndDelete(req.params.id);
    succcess = true;
    res.json({ success, deleteExpense });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success, error: "Internal Server Error" });
  }
});

module.exports = router;
