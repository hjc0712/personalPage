const express = require('express'),
  router = express.Router();
  path = require('path');

const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'hotmail',
  auth: {
		user: 'IT.Group@crconc.org',
		pass: 'develop@CRC'
	}
});

router.get('/quality',(req,res) => {
  res.render('services/quality');
});

router.get('/regulatory',(req,res) => {
  res.render('services/regulatory');
});

router.get('/clinical',(req,res) => {
  res.render('services/clinical');
});

router.get('/business',(req,res) => {
  res.render('services/business');
});

router.post('/:id', (req, res) => {
	const ejsname = req.body.name;
  const ejsemail = req.body.email;
  const ejssubject = req.body.subject;
  const ejsmessage = req.body.message;

	const mailOptions = {
		from: 'IT.Group@crconc.org',
		to: ['Cindy.Ru@crconc.org', 'Brenda.Ngo@crconc.org'],
		subject: `Contact from ${ejsname}(about ${req.params.id})`,
		text: `name: ${ejsname}\nemail: ${ejsemail}\nsubject ${ejssubject}\nmessage: ${ejsmessage}`
	};

	transporter.sendMail(mailOptions, function(error, info){
	  if (error) {
	    console.log(error);
	  } else {
	    console.log('Email sent: ' + info.response);
	    res.render(`services/${req.params.id}`);
	  }
	});
});

module.exports = router;