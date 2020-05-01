const express = require('express'),
  router = express.Router(),
  path = require('path');

router.get('/press',(req,res) => {
  res.render('basic/press/press');
});

router.get('/press/press_1',(req,res) => {
  res.render('basic/press/press_1');
});

router.get('/press/press_2',(req,res) => {
  res.render('basic/press/press_2');
});

router.get('/press/press_3',(req,res) => {
  res.render('basic/press/press_3');
});

router.get('/talks',(req,res) => {
  res.render('basic/talks/talk2018');
});

router.get('/talk2019',(req,res) => {
  res.render('basic/talks/talk2019');
});
router.get('/talk2018',(req,res) => {
  res.render('basic/talks/talk2018');
});
router.get('/talk2017',(req,res) => {
  res.render('basic/talks/talk2017');
});

router.get('/talks/BIIS',(req,res) => {
  res.render('basic/talks/BIIS');
});

router.get('/talks/Phacilitate',(req,res) => {
  res.render('basic/talks/Phacilitate');
});

router.get('/talks/ACTSS',(req,res) => {
  res.render('basic/talks/ACTSS');
});

router.get('/talks/CTSSC',(req,res) => {
  res.render('basic/talks/CTSSC');
});

router.get('/talks/Jefferies',(req,res) => {
  res.render('basic/talks/Jefferies');
});

router.get('/talks/ChinaTrail',(req,res) => {
  res.render('basic/talks/ChinaTrail');
});

router.get('/policy',(req,res) => {
  res.render('basic/policy');
});

router.get('/aboutus',(req,res) => {
  res.render('basic/aboutus');
});

module.exports = router;