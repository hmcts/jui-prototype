var express = require('express');
var router  = express.Router();
var helpers = require('./helpers');
var Validator = require('./validator');
var moment = require('moment');
var uuid = require('uuid/v4');

router.get('/app/cases/:id/linked-cases', (req, res) => {
	var _case = helpers.getCase(req.session.cases, req.params.id);

	linkedCaseRows = helpers.getLinkedCases(_case).map(function(c) {
		var cells = [];
		cells.push({ html : `<a href="/app/cases/${c.id}">${c.id}</a>` });
		cells.push({ html: helpers.getPartiesLineDashboard(c)	});
		cells.push({ html: helpers.getCaseTypeLabel(c) });
		cells.push({ html: c.linkReason });
		cells.push({ html: c.linkPerson });
		cells.push({ html: (c.linkType == 'hard') ? '' : 'Remove' });
		return cells;
	});

	var pageObject = {
		_case: _case,
		casebar: helpers.getCaseBarObject(_case),
		caseNavItems: helpers.getCaseNavItems(_case, 'linked-cases'),
		caseActions: helpers.getCaseActions(_case),
		linkedCaseRows: linkedCaseRows
	};

	res.render('app/case/linked-cases/index', pageObject);

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

	//_case.linkedCases.push();

	req.flash('success', 'case linked');
	res.redirect(`/app/cases/${_case.id}/linked-cases`);

});

module.exports = router;