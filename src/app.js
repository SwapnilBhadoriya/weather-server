const path = require("path");
const express = require("express");
const hbs = require("hbs");

const { geocode, forecast } = require("./utils");

const app = express();

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

// Setup handlebars engine and views location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather",
    name: "Somone",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About Me",
    name: "Somone",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    helpText: "This is some helpful text.",
    title: "Help",
    name: "Someone",
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({ error: "You must provide an address ." });
  }

  geocode(req.query.address, (error, data) => {
    if (error) {
      return res.send({ error });
    } else {
      forecast(data, (error, foreCastdata) => {
        if (error) {
          return res.send({ error });
        } else {
          return res.send({
            location: data.location,
            foreCastdata,
            address: req.query.address,
          });
        }
      });
    }
  });
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "404",
    name: "Someone",
    errorMessage: "Help article not found.",
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    title: "404",
    name: "Somone",
    errorMessage: "Page not found.",
  });
});

app.listen(3000, () => {
  console.log("Server is up on port 3000.");
});
