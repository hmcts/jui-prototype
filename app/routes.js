const express = require('express');
const router  = express.Router();

router.use('/', require('./routes/core'));
router.use('/', require('./routes/pip'));
router.use('/', require('./routes/divorce'));
router.use('/', require('./routes/fr'));
router.use('/', require('./routes/timeline'));
router.use('/', require('./routes/questions'));
router.use('/', require('./routes/linked-cases'));
router.use('/', require('./routes/related-cases'));
router.use('/', require('./routes/reassign'));
router.use('/', require('./routes/reserve'));
router.use('/', require('./routes/refer'));
router.use('/', require('./routes/reply'));
router.use('/', require('./routes/actions'));

router.get('/', function (req, res) {
	req.session.destroy();
	res.render('index');
});

module.exports = router;
