const mongoose = require('mongoose');

const jiraStatusSchema = new mongoose.Schema({
    name: {type: String, required: true}
})

module.exports = mongoose.model('jiraStatus', jiraStatusSchema); 