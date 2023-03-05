const express = require('express');
const mongoose = require('mongoose');
const data_router = require('./routes');
const app = express();
app.use(express.json());
const PORT = 8000;

const mongurl = "mongodb+srv://karunakar234:b1tterEfIBOuQFf6@cluster0.oht6gkw.mongodb.net/?retryWrites=true&w=majority";
mongoose.connect(mongurl, {
    UseNewUrlParser: true
})
    .then(() => {
        console.log("connected to database");
    })
    .catch((e) => {
        console.log("error");
    })

app.use("/", data_router);








app.listen(PORT, () => {
    console.log(`server is up at ${PORT}`);
})