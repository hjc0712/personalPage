const express = require('express'),
  router = express.Router();

router.get("/fda", (req, res) => {
  res.render("references/fda");
});

router.get("/cfda", (req, res) => {
  res.render("references/cfda");
});

router.get("/ema", (req, res) => {
  res.render("references/ema");
});

router.get("/others", (req, res) => {
  res.render("references/others");
});

router.get("/ct", (req, res) => {
  res.render("references/ct");
});

router.get("/ngo", (req, res) => {
  res.render("references/ngo");
});

module.exports = router;