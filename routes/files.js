const express = require('express'),
  router = express.Router()
  fs = require('fs');

router.get('/:id', (req, res) => {
  if (req.params.id.endsWith('.pdf')) {
    const data = fs.readFileSync(`files/${req.params.id}`);
    res.contentType("application/pdf");
    res.send(data);
  }
});

module.exports = router;