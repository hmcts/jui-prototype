var express = require('express');
var router  = express.Router();
var helpers = require('./helpers');

router.get('/app/cases/:id/unreserve', (req, res) => {
	var _case = helpers.getCase(req.session.cases, req.params.id);
	var pageObject = {
		_case: _case,
		casebar: helpers.getCaseBarObject(_case)
	};
  res.render('app/case/unreserve/index', pageObject);
});

router.post('/app/cases/:id/unreserve', (req, res) => {
	res.redirect(`/app/cases/${req.params.id}/unreserve/check`);
});

router.get('/app/cases/:id/unreserve/check', (req, res) => {
	var _case = helpers.getCase(req.session.cases, req.params.id);
	var pageObject = {
		_case: _case,
		casebar: helpers.getCaseBarObject(_case)
	};
  res.render('app/case/unreserve/check', pageObject);
});

router.post('/app/cases/:id/unreserve/check', (req, res) => {
	res.redirect(`/app/cases/${req.params.id}/unreserve/confirmation`);
});

router.get('/app/cases/:id/unreserve/confirmation', (req, res) => {
	var _case = helpers.getCase(req.session.cases, req.params.id);
	var pageObject = {
		_case: _case,
		casebar: helpers.getCaseBarObject(_case)
	};
	res.render('app/case/unreserve/confirmation', pageObject);
});

module.exports = router;