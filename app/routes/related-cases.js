var express = require('express');
var router  = express.Router();
var helpers = require('./helpers');

router.get('/app/cases/:id/related-cases/new', (req, res) => {
	var _case = helpers.getCase(req.session.cases, req.params.id);
	var pageObject = {
		_case: _case,
		casebar: helpers.getCaseBarObject(_case),
		caseNavItems: helpers.getCaseNavItems(_case, 'linked-cases'),
		caseActions: helpers.getCaseBarActions(_case),
	};
	res.render('app/case/related-cases/new', pageObject);
});

router.post('/app/cases/:id/related-cases/new', (req, res) => {
	var _case = helpers.getCase(req.session.cases, req.params.id);

	var newCase = helpers.getCase(req.session.cases, req.body['case-number'].trim());
	newCase.linkReason = req.body['reason'];
  newCase.linkPerson = 'Judge Silver';
  newCase.linkType = 'hard';

	if(!_case.relatedCases) {
		_case.relatedCases = [];
	}
	_case.relatedCases.push(newCase);

	req.flash('success', 'relatedcase added');
	res.redirect(`/app/cases/${_case.id}/linked-cases`);
});

router.get('/app/cases/:id/related-cases/:relatedcaseid/delete', (req, res) => {
	var _case = helpers.getCase(req.session.cases, req.params.id);
	var pageObject = {
		_case: _case,
		casebar: helpers.getCaseBarObject(_case),
		caseActions: helpers.getCaseBarActions(_case),
		relatedCase: helpers.getCase(req.session.cases, req.params.relatedcaseid)
	};
	res.render('app/case/related-cases/delete', pageObject);
});

router.post('/app/cases/:case_id/related-cases/:relatedcaseid/delete', (req, res) => {
	var _case = helpers.getCase(req.session.cases, req.params.case_id);
	var relatedCase = helpers.getRelatedCase(_case, req.params.relatedcaseid);
	helpers.removeRelatedCase(_case, relatedCase);
	req.flash('success', 'relatedcase removed');
	res.redirect(`/app/cases/${_case.id}/linked-cases`);
});

module.exports = router;