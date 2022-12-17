const express = require("express");
const cors = require("cors");
const proxy = require("express-http-proxy");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/languages", proxy("http://localhost:5008"));

app.use("/api/compand", proxy("http://localhost:5007"));

app.use("/api/skills", proxy("http://localhost:5006"));

app.use("/api/plan", proxy("http://localhost:5005"));

app.use("/api/file", proxy("http://localhost:5004"));

app.use("/api/talent", proxy("http://localhost:5003"));

app.use("/api/company", proxy("http://localhost:5002"));

app.use("/api/users", proxy("http://localhost:5001"));

app.listen(5000, () => {
  console.log("Gateway is Listening to Port 5000");
});
