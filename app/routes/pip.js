var express = require('express');
var router  = express.Router();
var helpers = require('./helpers');

router.get('/app/cases/:id/pip/make-decision', (req, res) => {
  var _case = helpers.getCase(req.session.cases, req.params.id);

	var pageObject = {
		casebar: helpers.getCaseBarObject(_case),
		caseActions: helpers.getCaseActions(_case),
    decision: req.session.data['decision-notes'],
    backLink: {
      href: `/app/cases/${_case.id}`
    }
	};

	res.render('app/case/pip/decision/decision', pageObject);
});

router.post('/app/cases/:id/pip/make-decision', (req, res) => {
  res.redirect(`/app/cases/${req.params.id}/pip/check-decision`);
});

router.get('/app/cases/:id/pip/check-decision', (req, res) => {
	var _case = helpers.getCase(req.session.cases, req.params.id);
	var pageObject = {
		backLink: {
			href: `/app/cases/${_case.id}/pip/make-decision/`
		},
		decision: req.session.data['decision-notes'],
		_case: _case
	};

	res.render('app/case/pip/decision/check', pageObject);
});

router.post('/app/cases/:id/pip/submit-decision', (req, res) => {
	res.redirect(`/app/cases/${req.params.id}/pip/confirmation`);
});

router.get('/app/cases/:id/pip/confirmation', (req, res) => {
	var _case = helpers.getCase(req.session.cases, req.params.id);
	var pageObject = {
		_case: _case
	};
	res.render('app/case/pip/decision/confirmation', pageObject);
});

module.exports = router;