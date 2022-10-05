const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

require("dotenv").config();

const boardRouter = require("./components/board/boardRoute");
const jiraStatusesRouter = require("./components/jiraStatuses/jiraStatusRoute");
const tasksRouter = require("./components/tasks/task.routes");

const app = express();
const port = process.env.PORT || 5000;

const MONGO_URL = process.env.MONGO_URL;

mongoose.connect(MONGO_URL, (err) => {
    if (!err) {
        console.log("MongoDB Connection Succeeded.");
    } else {
        console.log("Error in DB connection: " + err);
    }
});

app.use(cors());
app.use(express.json());

app.use("/boards", boardRouter);
app.use("/jiraStatuses", jiraStatusesRouter);
app.use("/tasks", tasksRouter);


app.listen(port, () =>
    console.log("> Server is up and running on port : " + port)
);
