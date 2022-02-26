const express = require("express");
const app = express();
const port = 5000;
const http = require("http").createServer(app);
const routes = require("./routes");
const cors = require("cors");

app.use(cors());

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(routes);

app.get("/", (req, res) => {
  res.send("chat server is runnging");
});

http.listen(port, () => {
  console.log(`server is running onport ${port}`);
});
