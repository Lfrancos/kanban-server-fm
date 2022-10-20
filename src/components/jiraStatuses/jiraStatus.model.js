const mongoose = require('mongoose');

const jiraStatusSchema = new mongoose.Schema({
    name: {type: String, required: true}
})

module.exports = mongoose.model('jiraStatus', jiraStatusSchema);
// This seems to me that could be really nice, still I'm not sure what I should be using. I need something to make it really easy and nice to understand.