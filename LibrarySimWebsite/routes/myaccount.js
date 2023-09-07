const path = require('path');
const express = require('express');
const router = express.Router();


router.get('/', (req, res) => {
    console.log('Connected through home.js');
    res.sendFile(path.resolve('public/html/my-account.html'));
});

module.exports = router;