const express = require("express");
const cors = require("cors");

const app = express();
app.use(express.json({ extended: true }));
app.use(cors({ origin: true, credentials: true }));

app.get("/", (req, res) => res.send("Hello world"));
app.get("/app", (req, res) => res.status(200).json({ data: "We are communicating" }));

const port = process.env.port || 5000;

app.listen(port, () => console.log(`server is up & running on port:${port}`));
