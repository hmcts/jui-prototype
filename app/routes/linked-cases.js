var express = require('express');
var router  = express.Router();
var helpers = require('./helpers');
var Validator = require('./validator');
var moment = require('moment');
var uuid = require('uuid/v4');

router.get('/app/cases/:id/linked-cases', (req, res) => {
	var _case = helpers.getCase(req.session.cases, req.params.id);

	// var linkedCases = helpers.getLinkedCases(_case);
	// if(linkedCases) {
	// 	var linkedCaseRows = linkedCases.map(function(c) {
	// 		var cells = [];
	// 		cells.push({ html : `<a href="/app/cases/${c.id}">${c.id}</a>` });
	// 		cells.push({ html: helpers.getPartiesLineDashboard(c)	});
	// 		cells.push({ html: helpers.getCaseTypeLabel(c) });
	// 		cells.push({ html: c.linkReason });
	// 		cells.push({ html: c.linkPerson });
	// 		cells.push({ html: (c.linkType == 'hard') ? '' : `<a href="/app/cases/${_case.id}/linked-cases/${c.id}/delete">Remove link</a>` });
	// 		return cells;
	// 	});
	// }

	var relatedCases = helpers.getRelatedCases(_case);
	if(relatedCases) {
		var relatedCaseRows = relatedCases.map(function(c) {
			var cells = [];
			cells.push({ html : helpers.getPartiesLineDashboard(c) + ' <br><span class="govuk-caption-m govuk-!-font-size-16"> ' + c.id + ' </span> ' });
			cells.push({ html: helpers.getCaseTypeLabel(c) });
			cells.push({ html: c.linkReason });
			cells.push({ html: c.linkPerson });
			cells.push({ html: '<a href="/app/cases/' + c.id + '">View</a> &nbsp;|&nbsp; <a href="/app/cases/${c.id}/related-cases/${c.id}/delete">Remove link</a>' });

			return cells;
		});
	}

	var pageObject = {
		_case: _case,
		casebar: helpers.getCaseBarObject(_case),
		caseNavItems: helpers.getCaseNavItems(_case, 'linked-cases'),
		caseActions: helpers.getCaseBarActions(_case),
		linkedCaseRows: relatedCaseRows,
	};

	var successFlash = req.flash('success');
	if(successFlash[0] == 'relatedcase added') {
		pageObject.success = 'Related case added successfully';
	}

	if(successFlash[0] == 'relatedcase removed') {
		pageObject.success = 'Related case removed successfully';
	}

	res.render('app/case/linked-cases/index', pageObject);

});

router.get('/app/cases/:id/linked-cases/new', (req, res) => {
	var _case = helpers.getCase(req.session.cases, req.params.id);
	var pageObject = {
		_case: _case,
		casebar: helpers.getCaseBarObject(_case),
		caseNavItems: helpers.getCaseNavItems(_case, 'linked-cases'),
		caseActions: helpers.getCaseBarActions(_case),
		linkedCases: helpers.getRelatedCases(_case)
	};
	res.render('app/case/linked-cases/new/index', pageObject);
});

router.post('/app/cases/:id/linked-cases/new', (req, res) => {
	res.redirect(`/app/cases/${req.params.id}/linked-cases/new/check`);
});

router.get('/app/cases/:id/linked-cases/new/check', (req, res) => {
	var _case = helpers.getCase(req.session.cases, req.params.id);
	var pageObject = {
		_case: _case,
		casebar: helpers.getCaseBarObject(_case),
		caseNavItems: helpers.getCaseNavItems(_case, 'linked-cases'),
		caseActions: helpers.getCaseBarActions(_case),
		linkedCases: helpers.getLinkedCases(_case)
	};
	res.render('app/case/linked-cases/new/check', pageObject);
});

router.post('/app/cases/:id/linked-cases/new/check', (req, res) => {
	res.redirect(`/app/cases/${req.params.id}/linked-cases/new/confirmation`);
});

router.get('/app/cases/:id/linked-cases/new/confirmation', (req, res) => {
	var _case = helpers.getCase(req.session.cases, req.params.id);
	var pageObject = {
		_case: _case,
		casebar: helpers.getCaseBarObject(_case),
		caseNavItems: helpers.getCaseNavItems(_case, 'linked-cases'),
		caseActions: helpers.getCaseBarActions(_case),
		linkedCases: helpers.getLinkedCases(_case)
	};
	res.render('app/case/linked-cases/new/confirmation', pageObject);
});

module.exports = router;