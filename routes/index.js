const express = require('express'),
  router = express.Router(),
  path = require('path');

var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
  service: '163',
  auth: {
	user: 'develop_hjc@163.com',
	pass: 'hjc123456'
	 }
	});



router.get('/', (req, res) => {
  res.render('index');
});

router.post('/', (req, res) => {
  var ejsname = req.body.name;
  var ejsemail = req.body.email;
  var ejssubject = req.body.subject;
  var ejsmessage = req.body.message;

  // console.log(req.body.name);

  

	var mailOptions = {
	  from: 'develop_hjc@163.com',
	  to: 'hongjichen0712@gmail.com',
	  subject: 'Contact from '+ ejsname,
	  text: 'name: '+ejsname + '\n' +'email: ' + ejsemail + '\n' +'subject: ' + ejssubject + '\n' +'message: ' + ejsmessage
	};

	transporter.sendMail(mailOptions, function(error, info){
	  if (error) {
	    console.log(error);
	  } else {
	    console.log('Email sent: ' + info.response);
	    res.render('index');
	  	// $("#contactBlock").css('display','none');
	  }
	});

});


module.exports = router;