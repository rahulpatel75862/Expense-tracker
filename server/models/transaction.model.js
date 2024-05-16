import mongoose from "mongoose";

const transactionSchema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    }, 
    description: {
        type: String,
        required: true,
    }, 
    paymentType: {
        type: String,
        enum: ["cash", "card"],
        required: true,
    },
    category: {
        type: String,
        enum: ["saving", "expense", "investment"],
        default: ""
    },
    amount: {
        type: Number,
        required: true,
    },
    location: {
        type: String,
        required: true
    }, 
    date: {
        type: Date,
        required: true
    }
}, {timestamps: true})

const Transaction = mongoose.model("Transaction", transactionSchema)
export default Transaction