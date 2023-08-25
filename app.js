const express = require("express");
const app = express();
const cors = require("cors")


app.use(
  cors({
  origin:'*'
}));

const DatesRouter = require("./src");


app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/dates", DatesRouter);




const PORT = process.env.PORT || 8080;

app.listen(PORT, console.log(`Server started on port ${PORT}`));
