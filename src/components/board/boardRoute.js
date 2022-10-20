const router = require("express").Router();

const boardModel = require("./boardModel");

// //////////////////////

router.get("/", async (req, res) => {
    const response = {
        status: "failed",
    };
    try {
        const data = await boardModel.find();
        response.status = "success";
        response.data = data;
        return res.send(response);
    } catch (error) {
        console.log(error);
        return;
    }
});

router.get("/:id", async (req, res, next) => {
    const response = {
        status: "failed",
    };
    try {
        const data = await boardModel.find({ _id: req.params.id });
        response.status = "success";
        response.data = data;
        return res.send(response);
    } catch (error) {
        next(error);
    }
});

router.post("/", async (req, res) => {
    const response = {
        status: "failed",
    };
    const newTitle = req.body.title.toLowerCase();

    if (newTitle) {
        try {
            const exist = await boardModel.find({ title: newTitle });
            if (exist.length > 0) throw new Error("this board already exists");
            response.status = "success";
            const newData = await boardModel.updateOne(
                { title: newTitle },
                { title: newTitle },
                { upsert: true }
            );
            console.log(newData._id);
            response.data = [{
                _id: newData.upsertedId,
                title: req.body.title,
                statuses: [],
            }];
            res.send(response);
        } catch (error) {
            console.log(error);
            response.error =
                "The board that you are trying to add already exists";
            res.status(400).send(response);
        }
    }
});

router.put("/:id", async (req, res) => {
    try {
        let id;
        if (req.params.id) {
            id = req.params.id;
        } else if (req.body.id) {
            id = req.body.id;
        } else {
            throw new Error(
                "Could not find the the board that you wanted to edit"
                // This is going to be incredible
            );
        }
        const old = await boardModel.find({ _id: id });

        if (req.body.title) {
            const response = await boardModel.updateOne(
                { _id: id },
                { title: req.body.title },
                { upsert: true }
            );
            return res.send(response);
        } else if (req.body.status) {
            console.log("old", old);
            const oldStatuses = old[0].statuses;
            const response = await boardModel.updateOne(
                { _id: id },
                { statuses: [...oldStatuses, req.body.status] },
                { upsert: true }
            );
            return res.send(response);
        }
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
