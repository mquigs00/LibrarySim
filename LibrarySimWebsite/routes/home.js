const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.sendFile('public/html/home-page.html', {root: __dirname});
});

router.get('/', (req, res) => {
    res.sendFile('public/html/header.html', {root: __dirname});
});
  
router.get('/', (req, res) => {
    res.sendFile('public/html/footer.html', {root: __dirname});
});

module.exports = router;