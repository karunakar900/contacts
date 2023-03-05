const express = require('express');
const userdata = require('./datamodel');
const data_router = express.Router();

data_router.post("/v1/contacts", async (req, res) => {//---->creating new userdata................
    const { firstName, lastName, email, phone } = req.body;
    try {

        const newuser = await userdata.create({
            firstName: firstName,
            lastName: lastName,
            email: email,
            phone: phone
        })
        res.status(200).json({
            status: "ok",
            result: newuser
        })
    } catch (e) {
        res.status(404).json({
            status: "failed",
            message: e.message
        })
    }
});


data_router.get("/v1/contacts", async (req, res) => {//  getting all existing userdatas from database..................
    try {
        const result = await userdata.find();
        res.status(200).json({
            status: "success",
            result: result
        });

    } catch {
        res.status(400).json({
            status: "failed",
            result: "cannot find contacts from lists"
        })
    }
});


data_router.get("/v1/contacts/:id", async (req, res) => {///  getting specified userdata using unique _id....................
    try {
        const specifieduser = await userdata.findOne({ _id: req.params.id });
        res.status(200).json({
            status: "success",
            result: specifieduser
        });
    } catch (e) {
        res.status(400).json({
            status: "failed",
            message: e.message
        })
    }
});



data_router.delete("/v1/contacts/:id", async (req, res) => { ///deleting specified user based on unique _id...................
    try {
        const remove_user = await userdata.deleteOne({ _id: req.params.id });
        res.status(200).json({
            status: "user deleted successfully",
            result: remove_user
        })
    } catch (e) {
        res.status(400).json({
            status: "failed",
            message: e.message
        })
    }
});

data_router.put("/v1/contacts/:id", async (req, res) => {
    try {
        await Data_models.updateOne({ _id: req.params.id }, req.body)
        res.status(204).json({
            status: "success"
        })
    } catch (e) {
        res.status(404).json({
            status: "Failed,",
            message: "There is no contact with that id"
        })
    }

});
data_router.patch("/v1/contacts/:id", async (req, res) => {
    try {
        const update = await Data_models.updateOne({ _id: req.params.id }, { $set: { firstName: req.body.firstName } })
        res.status(204).json({
            status: "Successfully updated",
            result: update
        })
    }
    catch (e) {
        res.status(404).json({
            status: "Failed,",
            message: "There is no contact with that id"
        })
    }

});
module.exports = data_router;