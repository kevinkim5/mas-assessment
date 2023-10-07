const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const express = require("express");
const fs = require("fs");
const path = require("path");
dotenv.config();

const Logger = require("./logger");

const app = express();
const logger = Logger(path.basename(__filename));
const PORT = process.env.PORT || 3000;

let corsOptions = {
  origin: "*",
};
app.use(cors({ options: corsOptions }));

app.use(bodyParser.json()); // application/json
app.use(bodyParser.urlencoded({ extended: true })); //application/x-www-form-urlencoded

app.get("/", (req, res) => {
  logger.info(`Request received: ${JSON.stringify(req.query)}`);
  fs.readFile("./data/test-data.json", "utf8", (err, data) => {
    if (err) {
      logger.error(err);
      res.status(500).json({ message: "Error occurred while retrieving data" });
    }

    try {
      // parse file content to json
      let jsonData = JSON.parse(data);
      let outputData = [];

      // check for sort
      if (req.query.sort !== undefined && req.query.sort !== "") {
        let sort = req.query.sort;
        if (sort === "location") {
          jsonData.sort((a, b) => a[sort].localeCompare(b[sort]));
        } else {
          jsonData.sort((a, b) => a[sort] - b[sort]);
        }
      }

      // check for search
      if (req.query.search !== undefined && req.query.search !== "") {
        let search = req.query.search.toLowerCase();
        jsonData = jsonData.filter((item) => {
          if (item.location.toLowerCase().includes(search)) {
            return item;
          }
        });
      }

      // paginate data
      if (req.query.page !== undefined && req.query.page !== "") {
        let page = req.query.page;
        outputData = jsonData.slice(12 * (page - 1), 12 * page);
      } else {
        outputData = jsonData.slice(0, 12);
      }

      // send data
      logger.info("Sending response...");
      res.json({
        message: "ok",
        data: outputData,
        maxPage: Math.ceil(jsonData.length / 12),
        totalCount: jsonData.length,
      });
    } catch (err) {
      // send data
      logger.error(err);
      res.status(500).json({ message: "Error occurred while retrieving data" });
    }
  });
});

app.listen(PORT, () => {
  logger.info(`Server listening at http://localhost:${PORT}`);
});
