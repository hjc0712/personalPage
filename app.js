const express = require('express'),
  app = express();
  bodyParser = require('body-parser'),
  mongoose = require('mongoose'),
  methodOverride = require('method-override');

const indexRoutes = require('./routes/index'),
    homeRoutes = require('./routes/home'),
    projectRoutes = require('./routes/project'),
    idolsRoutes = require('./routes/idols'),
  basicRoutes = require('./routes/basic'),
  serviceRoutes = require('./routes/services'),
  referenceRoutes = require('./routes/references'),
  careerRoutes = require('./routes/careers'),
  fileRoutes = require('./routes/files');

app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', 'ejs');
app.use('/static', express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/views'));
app.use(methodOverride('_method'));

app.use('/', indexRoutes);
app.use('/home', homeRoutes);
app.use('/project', projectRoutes);
app.use('/idols', idolsRoutes);
app.use('/basic', basicRoutes);
app.use('/services', serviceRoutes);
app.use('/references', referenceRoutes);
app.use('/careers', careerRoutes);

app.use('/files', fileRoutes);

app.listen(process.env.PORT || 3000, function() {
  console.log('The server has started.');
});