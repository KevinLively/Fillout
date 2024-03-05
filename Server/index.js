const express = require("express");
const cors = require("cors");
const formRoutes = require("./routes/formRoutes");

const app = express();
const port = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

app.use("/", formRoutes);

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
