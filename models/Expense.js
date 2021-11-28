const mongoose = require('mongoose')
const { Schema } = mongoose

const ExpenseSchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    amount: {
        type: Number,
        required: true
    }, 
    date: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('expense', ExpenseSchema);