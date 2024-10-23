const { Router } = require("express");

const appRoute = require("./app.route");

const router = Router();

router.get("/", (req, res) => {
  res.send(`<h1>My Backend Application</h1>`);
});

const defaultRoutes = [{ path: "/app", route: appRoute }];

defaultRoutes.map((route) => {
  router.use(route.path, route.route);
});

router.use(function (req, res, next) {
  res.status(404).send("Page not found!");
});
module.exports = router;
