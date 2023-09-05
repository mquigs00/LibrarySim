const path = require('path');
const express = require('express');
const router = express.Router();


router.get('/', (req, res) => {
    console.log('Connected through home.js');
    res.sendFile(path.resolve('public/html/home-page.html'));
});

router.get('/header.html', (req, res) => {
    res.sendFile(path.resolve('public/html/header.html'));
});

router.get('/footer.html', (req, res) => {
    res.sendFile(path.resolve('public/html/footer.html'));
});


module.exports = router;