const express = require('express');

const app = express();
const port = 3000;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.json({ message: "Hello world" });
});

app.listen(port, () => {
    console.log(`Study app listening at http://localhost:${port}`);
})