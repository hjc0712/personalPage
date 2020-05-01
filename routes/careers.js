const express = require('express'),
	router = express.Router(),
	multer = require('multer'),
	nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
	service: 'hotmail',
	auth: {
		user: 'IT.Group@crconc.org',
		pass: 'develop@CRC'
	}
});

const storage = multer.diskStorage({ 
	destination: function (req, file, cb) { 
		cb(null, 'files/');
	},
	filename: function (req, file, cb) { 
		cb(null, '1.pdf');
	}
});

const upload = multer({ storage: storage });

router.get('/openings',(req,res) => {
  res.render('careers/openings', {isInternship: true});
});

router.get('/openings/:id',(req,res) => {
  res.render('careers/opening', {description: descriptions[req.params.id], id: req.params.id, isInternship: false});
});

router.get('/',(req,res) => {
  res.render('careers/index');
});

router.post('/openings/:id', upload.single('resume'), (req, res, next) => {
  const ejsname = req.body.name;
  const ejsemail = req.body.email;
  const resume = req.body.resume;
  const ejsmessage = req.body.message;
	let subject;
	switch(req.params.id) {
		case "CDM": subject = 'Application (Clinical Data Manager,  Full-time)'; break;
		case "CM": subject = 'Application (Contract Manager,  Full-time)'; break;
		case "CTM": subject = 'Application (Clinical Trial Manager,  Full-time)'; break;
		case "EA": subject = 'Application (Executive Assistant,  Full-time)'; break;
		case "RAA": subject = 'Application (Regulatory Affairs Associate,  Full-time)'; break;
		default: break;
	}

	const mailOptions = {
	  from: 'IT.Group@crconc.org',
	  to: 'IT.Group@crconc.org',
	  subject: subject,
		text: `name: ${ejsname}\nemail: ${ejsemail}\nresume: ${resume}\nmessage: ${ejsmessage}`,
	  attachments:[ 
			{ 
				filename : `${ejsname}_${req.params.id}.pdf`, 
				path: 'files/1.pdf'
			}, 
	  ] 
	}; 
	transporter.sendMail(mailOptions, function(error, info){
	  if (error) {
	    console.log(error);
	  } else {
	    console.log('Email sent: ' + info.response);
	    res.locals.alert = 'success';
			res.render('careers/opening', {description: descriptions[req.params.id], id: req.params.id, isInternship: false});
	  }
	});
});

router.post('/openings', upload.single('resume'), (req, res, next) => {
  const ejsname = req.body.name;
  const ejsemail = req.body.email;
  const resume = req.body.resume;
  const jobtitle = req.body["job-title"];
	const ejsmessage = req.body.message;
	
	const mailOptions = {
		from: 'IT.Group@crconc.org',
		to: ['hr@crconc.org', 'Johnny.wang@crconc.org', 'Cindy.ru@crconc.org'],
		subject: `Application ${jobtitle} Internship`,
		text: `name: ${ejsname}\nemail: ${ejsemail}\nresume: ${resume}\nmessage: ${ejsmessage}`,
		attachments:[ 
			{ 
				filename : `${ejsname}_${jobtitle} Internship.pdf`, 
				path: 'files/1.pdf'
			}, 
		] 
	}; 
	
	transporter.sendMail(mailOptions, function(error, info){
	  if (error) {
	    console.log(error);
	  } else {
	    console.log('Email sent: ' + info.response);
	    res.locals.alert = 'success';
	    res.render('careers/openings', {isInternship: true});
	  }
	});
});

const descriptions = {
	"CDM": 
		`
			<h1>Clinical Data Manager</h1>
			<h3>Location: San Diego</h3>
			<hr>
			<div>
				<h3>Qualifications</h3>
				<ul>
					<li>BS in biochemistry, cellular biology, or healthcare required</li>
					<li>Strong interests in Oncology Cell and Gene Therapy </li>
					<li>Quick learner, keen to details, quality oriented</li>
					<li>Excellent written and verbal communication skills in both English and Chinese </li>
					<li>Excellent in Microsoft Office</li>
				</ul>
				<h3>Benefits</h3>
				<ul>
					<li>full benefit package</li>
					<li>H1B Sponsorship</li>
				</ul>
			</div>
		`,
	"CM":
		`
			<h1>Contract Manager</h1>
			<h3>Location: San Diego</h3>
			<hr>
			<div>
					<h3>Qualifications</h3>
					<ul>
							<li>MS or Master in nursing preferred</li>
							<li>BS in biochemistry, cellular biology, or healthcare required</li>
							<li>Strong interests in Oncology Cell and Gene Therapy </li>
							<li>Quick learner, keen to details, quality oriented</li>
							<li>Excellent written and verbal communication skills in both English and Chinese </li>
							<li>Excellent in Microsoft Office</li>
					</ul>
					<h3>Benefits</h3>
					<ul>
							<li>full benefit package</li>
							<li>H1B Sponsorship</li>
					</ul>
			</div>
		`,
	"CTM": 
		`
			<h1>Clinical Trail Manager</h1>
			<h3>Location: San Diego</h3>
			<hr>
			<div>
					<h3>Qualifications</h3>
					<ul>
							<li>MS or Master in nursing preferred</li>
							<li>BS in biochemistry, cellular biology, or healthcare required</li>
							<li>Strong interests in Oncology Cell and Gene Therapy </li>
							<li>Quick learner, keen to details, quality oriented</li>
							<li>Excellent written and verbal communication skills in both English and Chinese </li>
							<li>Excellent in Microsoft Office</li>
					</ul>
					<h3>Benefits</h3>
					<ul>
							<li>full benefit package</li>
							<li>H1B Sponsorship</li>
					</ul>
			</div>
		`,
	"EA":
		`
			<h1>Executive Assistant</h1>
			<h3>Location: San Diego</h3>
			<hr>
			<div>
					<h3>Qualifications</h3>
					<ul>
							<li>MS or Master in nursing preferred</li>
							<li>BS in biochemistry, cellular biology, or healthcare required</li>
							<li>Strong interests in Oncology Cell and Gene Therapy </li>
							<li>Quick learner, keen to details, quality oriented</li>
							<li>Excellent written and verbal communication skills in both English and Chinese </li>
							<li>Excellent in Microsoft Office</li>
					</ul>
					<h3>Benefits</h3>
					<ul>
							<li>full benefit package</li>
							<li>H1B Sponsorship</li>
					</ul>
			</div>
		`,
	"RAA":
		`
			<h1>Regulatory Affairs Associate</h1>
			<h3>Location: San Diego</h3>
			<hr>
			<div>
					<h3>Qualifications</h3>
					<ul>
							<li>MS or Master in nursing preferred</li>
							<li>BS in biochemistry, cellular biology, or healthcare required</li>
							<li>Strong interests in Oncology Cell and Gene Therapy </li>
							<li>Quick learner, keen to details, quality oriented</li>
							<li>Excellent written and verbal communication skills in both English and Chinese </li>
							<li>Excellent in Microsoft Office</li>
					</ul>
					<h3>Benefits</h3>
					<ul>
							<li>full benefit package</li>
							<li>H1B Sponsorship</li>
					</ul>
			</div>
		`
};

module.exports = router;


