const mongoose = require("mongoose");

const boardSchema = new mongoose.Schema({
    title: { type: String, require: true },
    statuses: [{ type: mongoose.Schema.Types.ObjectId }],
    tasks:  { type: [{ type: mongoose.Schema.Types.ObjectId }], require: true, default: []},
});

module.exports = mongoose.model("board", boardSchema);
