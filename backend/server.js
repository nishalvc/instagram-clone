const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Server is running successfully!");
});

app.post("/login", (req, res) => {

    const username = req.body.username;
    const password = req.body.password;

    console.log("Username:", username);
    console.log("Password:", password);

    res.json({
        message: "Login data received successfully!"
    });

});

app.listen(5000, () => {
    console.log("Server started on http://localhost:5000");
});