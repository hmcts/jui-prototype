const express = require('express');
const router  = express.Router();

router.use('/', require('./routes/jui'));
router.use('/', require('./routes/pip'));
router.use('/', require('./routes/divorce'));
router.use('/', require('./routes/fr'));
router.use('/', require('./routes/questions'));
router.use('/', require('./routes/directions'));

router.get('/', function (req, res) {
	req.session.destroy();
	res.redirect('/app/dashboard');
});

module.exports = router;
