const express = require('express'),
    router = express.Router(),
    path = require('path');


router.get('/', (req, res) => {
    res.render('project/project');
});



module.exports = router;