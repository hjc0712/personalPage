const express = require('express'),
  app = express();
  bodyParser = require('body-parser'),
  mongoose = require('mongoose'),
  methodOverride = require('method-override');

const indexRoutes = require('./routes/index'),
    homeRoutes = require('./routes/home'),
    projectRoutes = require('./routes/project'),
    idolsRoutes = require('./routes/idols'),
    musicsRoutes = require('./routes/musics'),
    journeysRoutes = require('./routes/journeys'),
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
app.use('/musics', musicsRoutes);
app.use('/journeys', journeysRoutes);
app.use('/files', fileRoutes);

app.listen(process.env.PORT || 3000, function() {
  console.log('The server has started.');
});