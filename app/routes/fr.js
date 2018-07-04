var express = require('express');
var router  = express.Router();
var helpers = require('./helpers');

router.get('/app/cases/:id/fr', (req, res) => {
  var _case = helpers.getCase(req.session.cases, req.params.id);

	var pageObject = {
		_case: _case,
		success: req.session.success,
		casebar: helpers.getCaseBarObject(_case),
		caseActions: helpers.getCaseActions(_case),
		caseNavItems: helpers.getCaseNavItems(_case, 'summary'),
		detailsRows: [],
		panelRows: [],
		recentEvents: helpers.getRecentEvents(_case)
	};

	// Case details
	pageObject.detailsRows.push([{ html: 'Parties' }, {html: helpers.getPartiesLine(_case)}]);
	pageObject.detailsRows.push([{ html: 'Case number' }, {html: _case.id}]);
  pageObject.detailsRows.push([{ html: 'Divorce case number' }, {html: _case.divorceCase.id}]);
  pageObject.detailsRows.push([{ html: 'Divorce case status' }, {html: _case.divorceCase.status}]);
	pageObject.detailsRows.push([{ html: 'Case type' }, {html: helpers.getCaseTypeLabel(_case)}]);

	res.render('app/case/fr/summary', pageObject);
});

router.get('/app/cases/:id/fr/consent-orders', (req, res) => {
  var _case = helpers.getCase(req.session.cases, req.params.id);

	var pageObject = {
		_case: _case,
		casebar: helpers.getCaseBarObject(_case),
		caseActions: helpers.getCaseActions(_case),
		caseNavItems: helpers.getCaseNavItems(_case, 'consentorders')
	};

	res.render('app/case/fr/consent-orders', pageObject);
});

router.get('/app/cases/:id/fr/history', (req, res) => {
  var _case = helpers.getCase(req.session.cases, req.params.id);

	var pageObject = {
		_case: _case,
		casebar: helpers.getCaseBarObject(_case),
		caseActions: helpers.getCaseActions(_case),
		caseNavItems: helpers.getCaseNavItems(_case, 'casefile')
	};

	res.render('app/case/fr/history', pageObject);
});

router.get('/app/cases/:id/fr/upload', (req, res) => {
  var _case = helpers.getCase(req.session.cases, req.params.id);

	var pageObject = {
		_case: _case,
		casebar: helpers.getCaseBarObject(_case),
		caseActions: helpers.getCaseActions(_case),
		caseNavItems: helpers.getCaseNavItems(_case, 'casefile')
	};

	res.render('app/case/fr/upload', pageObject);
});

module.exports = router;