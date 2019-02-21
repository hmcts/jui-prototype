var express = require('express');
var router  = express.Router();
var helpers = require('./helpers');

router.get('/app/cases/:id/reply', (req, res) => {
	var _case = helpers.getCase(req.session.cases, req.params.id);
	var pageObject = {
		_case: _case,
		casebar: helpers.getCaseBarObject(_case)
	};
  res.render('app/case/reply/index', pageObject);
});

router.post('/app/cases/:id/reply', (req, res) => {
	res.redirect(`/app/cases/${req.params.id}/reply/check`);
});

router.get('/app/cases/:id/reply/check', (req, res) => {
	var _case = helpers.getCase(req.session.cases, req.params.id);
	var pageObject = {
		_case: _case,
		casebar: helpers.getCaseBarObject(_case)
	};
  res.render('app/case/reply/check', pageObject);
});

router.post('/app/cases/:id/reply/check', (req, res) => {
	res.redirect(`/app/cases/${req.params.id}/reply/confirmation`);
});

router.get('/app/cases/:id/reply/confirmation', (req, res) => {
	var _case = helpers.getCase(req.session.cases, req.params.id);
	var pageObject = {
		_case: _case,
		casebar: helpers.getCaseBarObject(_case)
	};
	res.render('app/case/reply/confirmation', pageObject);
});

module.exports = router;