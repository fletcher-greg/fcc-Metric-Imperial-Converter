const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const bodyParser = require("body-parser");
//  local imports
const formula = require("./middleware");

// CONSTANTS
const PORT = 3000;

//  init express

const app = express();

//   MIDDLEWARE

app.use(helmet());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

//  local middleware

app.post("/api/conversion", formula);

app.use(express.static(__dirname + "/views"));

app.listen(PORT, () => console.log(`App listening on PORT: ${PORT}`));
