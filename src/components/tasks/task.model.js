const mongoose = require('mongoose')

const taskSchema = mongoose.Schema({
    description : {
        type : String,
        require: true
    },
    date: {
        type: Date,
        require: true,
        default: Date.now()
    },
    statusId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "jiraStatus",
        require: true,
        default: "632238ed795c6245c5109476"
    }
})

module.exports =  mongoose.model( 'task' , taskSchema)