var express = require('express');
var router  = express.Router();
var helpers = require('./helpers');


// Summary
router.get('/app/cases/:id/divorce', (req, res) => {

	var _case = helpers.getCase(req.session.cases, req.params.id);

	var pageObject = {
		_case: _case,
		casebar: helpers.getCaseBarObject(_case),
		caseActions: helpers.getCaseActions(_case),
		caseNavItems: helpers.getCaseNavItems(_case, 'summary'),
		detailsRows: [],
		representativesRows: [],
		recentEvents: helpers.getRecentEvents(_case)
	};

	pageObject.detailsRows.push([{ html: 'Case number' },	{ html: _case.id + (_case.urgent ? ' <span class="jui-status  jui-status--urgent  govuk-!-margin-left-1">Urgent</span> ' : '') }]);
	pageObject.detailsRows.push([{ html: 'Case type' },	{ html: helpers.getCaseTypeLabel(_case) }]);
	pageObject.detailsRows.push([{ html: 'Case status' }, { html: _case.summaryStatus ? _case.summaryStatus : _case.status }]);
	pageObject.detailsRows.push([{ html: 'Reason for divorce' }, { html: _case.reason }]);

	pageObject.representativesRows.push([{ html: 'Petitioner' }, { html: _case.petitionerRepresentativer ? _case.petitionerRepresentative : 'Unrepresented' }]);
	pageObject.representativesRows.push([{ html: 'Respondent' }, { html: _case.respondentRepresentative ? _case.respondentRepresentative : 'Unrepresented' }]);

	pageObject.linkedCaseRows = [];

	if(_case.linkedCases) {
		_case.linkedCases.forEach((item) => {
			pageObject.linkedCaseRows.push([{
				html: item.type
			}, {
				html: `<a href="/app/cases/${item.id}">${item.id}</a>`
			}]);
		});
	}

	res.render('app/case/divorce/summary', pageObject);

});


// Timeline
router.get('/app/cases/:id/divorce/timeline', (req, res) => {

	var _case = helpers.getCase(req.session.cases, req.params.id);

	var pageObject = {
		_case: _case,
		casebar: helpers.getCaseBarObject(_case),
		caseNavItems: helpers.getCaseNavItems(_case, 'timeline'),
		caseActions: helpers.getCaseActions(_case),
		events: helpers.getEvents(_case)
	};

	res.render('app/case/divorce/timeline', pageObject);

});


// Parties
router.get('/app/cases/:id/divorce/parties', (req, res) => {
	var _case = helpers.getCase(req.session.cases, req.params.id);

	var pageObject = {
		casebar: helpers.getCaseBarObject(_case),
		caseActions: helpers.getCaseActions(_case),
		caseNavItems: helpers.getCaseNavItems(_case, 'parties'),
		_case: _case
	};

	pageObject.petitionerRows = [];
	pageObject.respondentRows = [];

	if(_case.petitioner) {
		_case.petitioner.forEach((item) => {
			pageObject.petitionerRows.push([{ html: 'Full name' }, { html: item.fullname }]);
			pageObject.petitionerRows.push([{ html: 'Date of birth' }, { html: helpers.getFormattedDate(item.dateOfBirth) }]);
			pageObject.petitionerRows.push([{ html: 'Address' }, { html: item.address }]);
			pageObject.petitionerRows.push([{ html: 'Phone' }, { html: item.phone }]);
			pageObject.petitionerRows.push([{ html: 'Email' }, { html: item.email }]);
			pageObject.petitionerRows.push([{ html: 'Representative' }, { html: item.representative ? _case.representative : 'Unrepresented' }]);
		});
	}

	if(_case.respondent) {
		_case.respondent.forEach((item) => {
			pageObject.respondentRows.push([{ html: 'Full name' }, { html: item.fullname }]);
			pageObject.respondentRows.push([{ html: 'Date of birth' }, { html: helpers.getFormattedDate(item.dateOfBirth) }]);
			pageObject.respondentRows.push([{ html: 'Address' }, { html: item.address }]);
			pageObject.respondentRows.push([{ html: 'Phone' }, { html: item.phone }]);
			pageObject.respondentRows.push([{ html: 'Email' }, { html: item.email }]);
			pageObject.respondentRows.push([{ html: 'Representative' }, { html: item.representative ? _case.representative : 'Unrepresented' }]);
		});
	}

	res.render('app/case/divorce/parties', pageObject);

});


// Make a decision
router.get('/app/cases/:id/divorce/decision', (req, res) => {

	var _case = helpers.getCase(req.session.cases, req.params.id);

	var pageObject = {
		casebar: helpers.getCaseBarObject(_case),
		caseActions: helpers.getCaseActions(_case),
		petitioner: helpers.getPetitionerName(_case),
	};

	res.render('app/case/divorce/decision/decision', pageObject);

});

router.post('/app/cases/:id/divorce/decision', (req, res) => {
	if (req.body.satisfied === 'No') {
		res.redirect('provide-reason');
	} else if (req.body.satisfied === 'Yes') {
		res.redirect('costs-order');
	}
});


// Provide reason
router.get('/app/cases/:id/divorce/provide-reason', (req, res) => {
	var _case = helpers.getCase(req.session.cases, req.params.id);
	var pageObject = {
		casebar: helpers.getCaseBarObject(_case),
		backLink: {
			href: `/app/cases/${_case.id}/divorce/decision`
		}
	};
	res.render('app/case/divorce/decision/provide-reason', pageObject);
});

router.post('/app/cases/:id/divorce/provide-reason', (req, res) => {
	res.redirect('generate-order');
});


// Generate order
router.get('/app/cases/:id/divorce/generate-order', (req, res) => {
	var _case = helpers.getCase(req.session.cases, req.params.id);
	var pageObject = {
		casebar: helpers.getCaseBarObject(_case)
	};
	res.render('app/case/divorce/decision/generate-order', pageObject);
});

router.post('/app/cases/:id/divorce/generate-order', (req, res) => {
	res.redirect('confirmation');
});


// Costs order
router.get('/app/cases/:id/divorce/costs-order', (req, res) => {
	var _case = helpers.getCase(req.session.cases, req.params.id);
	var pageObject = {
		casebar: helpers.getCaseBarObject(_case),
		caseActions: helpers.getCaseActions(_case),
		backLink: {
			href: `/app/cases/${_case.id}/divorce/decision`
		},
		_case: _case
	};
	res.render('app/case/divorce/decision/costs-order', pageObject);
});

router.post('/app/cases/:id/divorce/costs-order', (req, res) => {
	res.redirect('check-your-answers');
});


// Check your answers
router.get('/app/cases/:id/divorce/check-your-answers', (req, res) => {
	var _case = helpers.getCase(req.session.cases, req.params.id);
	var pageObject = {
		casebar: helpers.getCaseBarObject(_case),
		caseActions: helpers.getCaseActions(_case),
		petitioner: helpers.getPetitionerName(_case),
		backLink: {
			href: `/app/cases/${_case.id}/divorce/costs-order`
		},
		_case: _case
	};
	res.render('app/case/divorce/decision/check-your-answers', pageObject);
});

router.post('/app/cases/:id/divorce/submit-decision', (req, res) => {
	res.redirect(`/app/cases/${req.params.id}/divorce/confirmation`);
});


// Confirmation
router.get('/app/cases/:id/divorce/confirmation', (req, res) => {
	var _case = helpers.getCase(req.session.cases, req.params.id);
	var pageObject = {
    casebar: helpers.getCaseBarObject(_case),
		caseActions: helpers.getCaseActions(_case),
    petitioner: helpers.getPetitionerName(_case),
    backLink: {
			href: ''
		},
		_case: _case
	};
	res.render('app/case/divorce/decision/confirmation', pageObject);
});

router.post('/app/cases/:id/divorce/confirmation', (req, res) => {
	res.redirect(`/app/cases/${req.params.id}/divorce/decision`);
});


module.exports = router;