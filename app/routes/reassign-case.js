var express = require('express');
var router  = express.Router();
var helpers = require('./helpers');

router.get('/app/cases/:id/reassign', (req, res) => {
	var _case = helpers.getCase(req.session.cases, req.params.id);

	var pageObject = {
		_case: _case,
		casebar: helpers.getCaseBarObject(_case)
	};

	res.render('app/case/reassign/index', pageObject);
});

router.post('/app/cases/:id/reassign', (req, res) => {
	if(req.body.who === 'namedperson') {
		res.redirect(`/app/cases/${req.params.id}/reassign/name`);
	} else if(req.body.who === 'role') {
		res.redirect(`/app/cases/${req.params.id}/reassign/role`);
	} else {
		res.redirect(`/app/cases/${req.params.id}/reassign/recipient-notes`);
	}
});

router.get('/app/cases/:id/reassign/name', (req, res) => {
	var _case = helpers.getCase(req.session.cases, req.params.id);

	var pageObject = {
		_case: _case,
		casebar: helpers.getCaseBarObject(_case)
	};

	res.render('app/case/reassign/name', pageObject);
});

router.post('/app/cases/:id/reassign/name', (req, res) => {
	res.redirect(`/app/cases/${req.params.id}/reassign/recipient-notes`);
});

router.get('/app/cases/:id/reassign/role', (req, res) => {
	var _case = helpers.getCase(req.session.cases, req.params.id);

	var pageObject = {
		_case: _case,
		casebar: helpers.getCaseBarObject(_case)
	};

	res.render('app/case/reassign/role', pageObject);
});

router.post('/app/cases/:id/reassign/role', (req, res) => {
	res.redirect(`/app/cases/${req.params.id}/reassign/recipient-notes`);
});

router.get('/app/cases/:id/reassign/recipient-notes', (req, res) => {
	var _case = helpers.getCase(req.session.cases, req.params.id);

	var pageObject = {
		_case: _case,
		casebar: helpers.getCaseBarObject(_case)
	};

	res.render('app/case/reassign/recipient-notes', pageObject);
});

router.post('/app/cases/:id/reassign/recipient-notes', (req, res) => {
	res.redirect(`/app/cases/${req.params.id}/reassign/check`);
});

router.get('/app/cases/:id/reassign/check', (req, res) => {
	var _case = helpers.getCase(req.session.cases, req.params.id);

	var pageObject = {
		_case: _case,
		casebar: helpers.getCaseBarObject(_case)
	};

	res.render('app/case/reassign/check', pageObject);
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

	res.render('app/case/reassign/confirmation', pageObject);
});

module.exports = router;