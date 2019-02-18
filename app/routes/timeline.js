var express = require('express');
var router  = express.Router();
var helpers = require('./helpers');

router.get('/app/cases/:id/timeline', (req, res) => {
	var _case = helpers.getCase(req.session.cases, req.params.id);
    var pageObject = {
      _case: _case,
      casebar: helpers.getCaseBarObject(_case),
      caseNavItems: helpers.getCaseNavItems(_case, 'timeline'),
      caseActions: helpers.getCaseActions(_case),
      events: helpers.getEvents(_case)
    };
    res.render('app/case/timeline/index', pageObject);

});

router.get('/app/cases/:id/linked-cases/new', (req, res) => {
	var _case = helpers.getCase(req.session.cases, req.params.id);
	var pageObject = {
		_case: _case,
		casebar: helpers.getCaseBarObject(_case),
		caseNavItems: helpers.getCaseNavItems(_case, 'linked-cases'),
		caseActions: helpers.getCaseActions(_case),
		linkedCases: helpers.getLinkedCases(_case)
	};
	res.render('app/case/linked-cases/new', pageObject);
});

router.post('/app/cases/:id/linked-cases/new', (req, res) => {
	var _case = helpers.getCase(req.session.cases, req.params.id);

	var newCase = helpers.getCase(req.session.cases, req.body['case-number'].trim());
	newCase.linkReason = req.body['reason'],
  newCase.linkPerson = 'Judge Silver',
  newCase.linkType = 'soft',

	_case.linkedCases.push(newCase);

	req.flash('success', 'case linked');
	res.redirect(`/app/cases/${_case.id}/linked-cases`);

});

router.get('/app/cases/:id/linked-cases/:linkedcaseid/delete', (req, res) => {
	var _case = helpers.getCase(req.session.cases, req.params.id);
	var pageObject = {
		_case: _case,
		casebar: helpers.getCaseBarObject(_case),
		caseActions: helpers.getCaseActions(_case),
		linkedCase: helpers.getCase(req.session.cases, req.params.linkedcaseid)
	};
	res.render('app/case/linked-cases/delete', pageObject);
});

router.post('/app/cases/:case_id/linked-cases/:linkedcaseid/delete', (req, res) => {
	var _case = helpers.getCase(req.session.cases, req.params.case_id);
	var linkedCase = helpers.getLinkedCase(_case, req.params.linkedcaseid);
	helpers.removeLinkedCase(_case, linkedCase);
	req.flash('success', 'case unlinked');
	res.redirect(`/app/cases/${_case.id}/linked-cases`);
});

module.exports = router;