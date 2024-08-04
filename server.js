// Get dependencies
const express = require("express");
const bodyParser = require("body-parser");
const history = require("connect-history-api-fallback");
// Get our API routes
// eslint-disable-next-line no-unused-vars
const mongodb = require("./server/mongo/config");

const api = require("./server/routes/api");
const productApi = require("./server/routes/productApi");
const ShippingDetailApi = require("./server/routes/shippingDetailApi");
const authApi = require("./server/routes/authApi");
const cors = require("cors");

const app = express();

// Parsers for POST data
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);

// Use cors middleware
app.use(
  cors({
    origin: "http://localhost:8081", // Specify the origin you want to allow
    methods: "GET, POST, OPTIONS, PUT, PATCH, DELETE",
    allowedHeaders: "X-Requested-With,content-type,Authorization", // Include Authorization header
    credentials: true,
  })
);

// Create link to Angular build directory
var distDir = __dirname + "/dist";
app.use(express.static(distDir));

app.use(history({ index: "/index.html" }));

app.use("/api", [api, productApi, authApi, ShippingDetailApi]);

//log output
const requestLogger = (req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
  next();
};
app.use(requestLogger);

// Initialize the app.
var server = app.listen(process.env.PORT || 8080, function () {
  var port = server.address().port;
  console.log("App now running on port", port);
});
