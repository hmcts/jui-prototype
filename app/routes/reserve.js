var express = require('express');
var router  = express.Router();
var helpers = require('./helpers');

router.get('/app/cases/:id/reserve', (req, res) => {
	var _case = helpers.getCase(req.session.cases, req.params.id);
	var pageObject = {
		_case: _case,
		casebar: helpers.getCaseBarObject(_case)
	};
  res.render('app/case/reserve/index', pageObject);
});

router.post('/app/cases/:id/reserve', (req, res) => {
	res.redirect(`/app/cases/${req.params.id}/reserve/check`);
});

router.get('/app/cases/:id/reserve/check', (req, res) => {
	var _case = helpers.getCase(req.session.cases, req.params.id);
	var pageObject = {
		_case: _case,
		casebar: helpers.getCaseBarObject(_case)
	};
  res.render('app/case/reserve/check', pageObject);
});

router.post('/app/cases/:id/reserve/check', (req, res) => {
	res.redirect(`/app/cases/${req.params.id}/reserve/confirmation`);
});

router.get('/app/cases/:id/reserve/confirmation', (req, res) => {
	var _case = helpers.getCase(req.session.cases, req.params.id);
	var pageObject = {
		_case: _case,
		casebar: helpers.getCaseBarObject(_case)
	};
	res.render('app/case/reserve/confirmation', pageObject);
});

module.exports = router;