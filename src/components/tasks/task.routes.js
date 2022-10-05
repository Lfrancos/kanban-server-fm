const router = require("express").Router();

const taskModel = require("./task.model");

router.get("/", async (_req, res) => {
    try {
        const response = await taskModel.find().populate("statusId", "-__v");
        res.send(response);
    } catch (error) {
        res.status(JSON.stringify(error));
    }
});

router.post("/", async (req, res) => {
    try {
        const response = await taskModel.create({
            description: req.body.description,
        });
        res.send(response);
    } catch (error) {
        res.status(400).send(JSON.stringify(error));
    }
    res.send("hello from simple server :)");
});

router.put("/", async (req, res) => {
    try {
        await taskModel.find({ _id: req.body._id });
        const updated = await taskModel.updateOne(
            { _id: req.body._id },
            { description: req.body.description }
        );
        res.send(updated);
    } catch (error) {
        res.status(400).send(JSON.stringify(error));
    }
});

router.delete("/", async (req, res) => {
    try {
        const response = await taskModel.find({ _id: req.body._id });
        await taskModel.deleteOne({ _id: req.body._id });
        res.send(response);
    } catch (error) {
        res.status(400).send(JSON.stringify(error));
    }
});

module.exports = router;
