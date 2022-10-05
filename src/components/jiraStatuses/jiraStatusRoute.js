const router = require("express").Router();

const jiraStatusModel = require("./jiraStatus.model");

router.get("/", async (req, res) => {
    try {
        const response = await jiraStatusModel.find().select("_id name");
        res.send(response);
        // res.send("hello, I'm not sure what is going on");
    } catch (error) {
        res.send(JSON.stringify(error));
    }
});

router.post("/", async (req, res) => {
    try {
        const exists = await jiraStatusModel.find({name: req.body.name});
        if (exists) throw new Error('it already exists')
        await jiraStatusModel.updateOne(
            { name: req.body.name },
            { name: req.body.name },
            { upsert: true }
        );
        res.send({ name: req.body.name });
    } catch (error) {
        res.status(400).send(JSON.stringify(error));
    }
});
router.put("/", async (req, res) => {
    try {
        await jiraStatusModel.find({ _id: req.body._id });
        const updated = await jiraStatusModel.updateOne(
            { _id: req.body._id },
            { name: req.body.name }
        );
        res.send(updated);
    } catch (error) {
        res.status(400).send(JSON.stringify(error));
    }
});

router.delete("/", async (req, res) => {
    try {
        const response = await jiraStatusModel.find({ _id: req.body._id });
        await jiraStatusModel.deleteOne({ _id: req.body._id });
        res.send(JSON.stringify(response));
    } catch (error) {
        res.status(400).send(JSON.stringify(error));
    }
});

module.exports = router;
