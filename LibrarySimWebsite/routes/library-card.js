const path = require('path');
const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.sendFile(path.resolve('public/html/library-card.html'));
});

module.exports = router;