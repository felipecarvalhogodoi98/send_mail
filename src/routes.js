const { Router } = require("express");
const AwsController = require("./controllers/AwsController");
const SendgridController = require("./controllers/SendgridController");

const routes = Router();

routes.post("/", AwsController.sendMail);
routes.post("/sendgrid", SendgridController.sendMail);

module.exports = routes;
