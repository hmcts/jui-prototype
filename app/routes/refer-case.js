var express = require('express');
var router  = express.Router();
var helpers = require('./helpers');

router.get('/app/cases/:id/refer', (req, res) => {
	var _case = helpers.getCase(req.session.cases, req.params.id);

	var pageObject = {
		_case: _case,
		casebar: helpers.getCaseBarObject(_case)
	};

	res.render('app/case/refer/index', pageObject);
});

router.post('/app/cases/:id/refer', (req, res) => {
	if(req.body.who === 'namedperson') {
		res.redirect(`/app/cases/${req.params.id}/refer/name`);
	} else if(req.body.who === 'role') {
		res.redirect(`/app/cases/${req.params.id}/refer/role`);
	} else {
		res.redirect(`/app/cases/${req.params.id}/refer/recipient-notes`);
	}
});

router.get('/app/cases/:id/refer/name', (req, res) => {
	var _case = helpers.getCase(req.session.cases, req.params.id);

	var pageObject = {
		_case: _case,
		casebar: helpers.getCaseBarObject(_case)
	};

	res.render('app/case/refer/name', pageObject);
});

router.post('/app/cases/:id/refer/name', (req, res) => {
	res.redirect(`/app/cases/${req.params.id}/refer/recipient-notes`);
});

router.get('/app/cases/:id/refer/role', (req, res) => {
	var _case = helpers.getCase(req.session.cases, req.params.id);

	var pageObject = {
		_case: _case,
		casebar: helpers.getCaseBarObject(_case)
	};

	res.render('app/case/refer/role', pageObject);
});

router.post('/app/cases/:id/refer/role', (req, res) => {
	res.redirect(`/app/cases/${req.params.id}/refer/recipient-notes`);
});

router.get('/app/cases/:id/refer/recipient-notes', (req, res) => {
	var _case = helpers.getCase(req.session.cases, req.params.id);

	var pageObject = {
		_case: _case,
		casebar: helpers.getCaseBarObject(_case)
	};

	res.render('app/case/refer/recipient-notes', pageObject);
});

router.post('/app/cases/:id/refer/recipient-notes', (req, res) => {
	res.redirect(`/app/cases/${req.params.id}/refer/check`);
});

router.get('/app/cases/:id/refer/check', (req, res) => {
	var _case = helpers.getCase(req.session.cases, req.params.id);

	var pageObject = {
		_case: _case,
		casebar: helpers.getCaseBarObject(_case)
	};

	res.render('app/case/refer/check', pageObject);
});

router.post('/app/cases/:id/refer/check', (req, res) => {
	res.redirect(`/app/cases/${req.params.id}/refer/confirmation`);
});

router.get('/app/cases/:id/refer/confirmation', (req, res) => {
	var _case = helpers.getCase(req.session.cases, req.params.id);

	var pageObject = {
		_case: _case,
		casebar: helpers.getCaseBarObject(_case)
	};

	res.render('app/case/refer/confirmation', pageObject);
});

module.exports = router;