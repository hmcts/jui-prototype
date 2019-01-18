var express = require('express');
var router  = express.Router();
var helpers = require('./helpers');

router.get('/app/cases/:id/reassign', (req, res) => {
	var _case = helpers.getCase(req.session.cases, req.params.id);

	var pageObject = {
		_case: _case,
		casebar: helpers.getCaseBarObject(_case)
	};

	res.render('app/case/reassign-case/index', pageObject);
});

router.post('/app/cases/:id/reassign', (req, res) => {
	if(req.body.who === 'namedperson') {
		res.redirect(`/app/cases/${req.params.id}/reassign/named-person`);
	} else {
		res.redirect(`/app/cases/${req.params.id}/reassign/check`);
	}
});

router.get('/app/cases/:id/reassign/named-person', (req, res) => {
	var _case = helpers.getCase(req.session.cases, req.params.id);

	var pageObject = {
		_case: _case,
		casebar: helpers.getCaseBarObject(_case)
	};

	res.render('app/case/reassign-case/named-person', pageObject);
});

router.post('/app/cases/:id/reassign/named-person', (req, res) => {
	res.redirect(`/app/cases/${req.params.id}/reassign/check`);
});

router.get('/app/cases/:id/reassign/check', (req, res) => {
	var _case = helpers.getCase(req.session.cases, req.params.id);

	var pageObject = {
		_case: _case,
		casebar: helpers.getCaseBarObject(_case)
	};

	res.render('app/case/reassign-case/check', pageObject);
});

router.post('/app/cases/:id/reassign/check', (req, res) => {
	res.redirect(`/app/cases/${req.params.id}/reassign/confirmation`);
});

router.get('/app/cases/:id/reassign/confirmation', (req, res) => {
	var _case = helpers.getCase(req.session.cases, req.params.id);

	var pageObject = {
		_case: _case,
		casebar: helpers.getCaseBarObject(_case)
	};

	res.render('app/case/reassign-case/confirmation', pageObject);
});

module.exports = router;