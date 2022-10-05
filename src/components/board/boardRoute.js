const router = require("express").Router();

const boardModel = require("./boardModel");

router.get("/", async (_req, res) => {
    try {
        const data = await boardModel.find();
        return res.send(data);
    } catch (error) {
        console.log(error);
        return;
    }
});

router.get("/:id", async (req, res) => {
    try {
        const data = await boardModel.find({ _id: req.params.id });
        return res.send(data);
    } catch (error) {
        console.log(error);
        return;
    }
});

router.post("/", async (req, res) => {
    const newTitle = req.body.title.toLowerCase();

    if (newTitle) {
        try {
            const exist = await boardModel.find({title: newTitle});
            if (exist.length > 0) throw new Error("this board already exists");
            const response = await boardModel.updateOne(
                { title: newTitle },
                { title: newTitle },
                { upsert: true }
            );
            res.send(response);
        } catch (error) {
            console.log(error);
            res.status(400).send("something went wrong");
        }
    }
});

router.put("/", async (req, res) => {
    try {
        const response = await boardModel.updateOne(
            { _id: req.body._id },
            { title: req.body.title },
            { upsert: true }
        );
        res.send(response);
    } catch (error) {
        console.log(error);
        res.status(400).send("there was an error");
    }
});

router.delete("/", async (req, res) => {
    const selectedId = req.body._id;
    try {
        const toDelete = await boardModel.find({ _id: selectedId });
        await boardModel.deleteOne({ _id: selectedId });
        return res.send(toDelete);
    } catch (error) {
        return res.status(400).send("could not delete that board");
    }
});

module.exports = router;

