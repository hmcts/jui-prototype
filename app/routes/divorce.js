var express = require('express');
var router  = express.Router();
var helpers = require('./helpers');

router.get('/app/cases/:id/divorce', (req, res) => {
	var _case = helpers.getCase(req.session.cases, req.params.id);

	var pageObject = {
		casebar: helpers.getCaseBarObject(_case),
		caseActions: helpers.getCaseActions(_case),
		caseNavItems: helpers.getCaseNavItems(_case, 'summary'),
		detailsRows: [],
		representativesRows: [],
		recentEvents: helpers.getRecentEvents(_case)
	};

	// Case details
	pageObject.detailsRows.push([{ html: 'Case number' },	{ html: _case.id + (_case.urgent ? ' <span class="jui-status  jui-status--urgent  govuk-!-margin-left-1">Urgent</span> ' : '') }]);
	pageObject.detailsRows.push([{ html: 'Case type' },	{ html: helpers.getCaseTypeLabel(_case) }]);
	pageObject.detailsRows.push([{ html: 'Case status' },	{ html: _case.status }]);
	pageObject.detailsRows.push([{ html: 'Reason for divorce' }, { html: _case.reason }]);


	// Representatives
	pageObject.representativesRows.push([{ html: 'Petitioner' }, { html: _case.petitioner ? _case.petitioner : 'Unrepresented' }]);
	pageObject.representativesRows.push([{ html: 'Respondent' }, { html: _case.respondent ? _case.respondent : 'Unrepresented' }]);

	res.render('app/case/divorce/summary', pageObject);
});

router.get('/app/cases/:id/divorce/parties', (req, res) => {
	var _case = helpers.getCase(req.session.cases, req.params.id);

	var pageObject = {
		casebar: helpers.getCaseBarObject(_case),
		caseActions: helpers.getCaseActions(_case),
		caseNavItems: helpers.getCaseNavItems(_case, 'parties')
	};

	res.render('app/case/divorce/parties', pageObject);
});


router.get('/app/cases/:id/divorce/make-decision', (req, res) => {
	var _case = helpers.getCase(req.session.cases, req.params.id);

	var pageObject = {
		casebar: helpers.getCaseBarObject(_case),
		caseActions: helpers.getCaseActions(_case)
	};

	res.render('app/case/divorce/decision/make-decision', pageObject);
});

router.post('/app/cases/:id/divorce/make-decision', (req, res) => {
	if (req.body.satisfied === 'no') {
		res.redirect('provide-reason');
	} else {
		res.redirect('costs-order');
	}
});

router.get('/app/cases/:id/divorce/provide-reason', (req, res) => {
	var _case = helpers.getCase(req.session.cases, req.params.id);
	var pageObject = {
		casebar: helpers.getCaseBarObject(_case),
		backLink: {
			href: `/app/cases/${_case.id}/make-decision`
		}
	};
	res.render('app/case/divorce/decision/provide-reason', pageObject);
});

router.post('/app/cases/:id/divorce/provide-reason', (req, res) => {
	res.redirect('generate-order');
});

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

// Yes option route
router.get('/app/cases/:id/divorce/costs-order', (req, res) => {
  var _case = helpers.getCase(req.session.cases, req.params.id);

	var pageObject = {
		casebar: helpers.getCaseBarObject(_case),
		caseActions: helpers.getCaseActions(_case)
	};

	res.render('app/case/divorce/decision/costs-order', pageObject);
});

router.post('/app/cases/:id/divorce/costs-order', (req, res) => {
	res.redirect('confirmation');
});

router.get('/app/cases/:id/divorce/confirmation', (req, res) => {
	var pageObject = {
		_case: helpers.getCase(req.session.cases, req.params.id)
	};
	res.render('app/case/divorce/decision/confirmation', pageObject);
});

// router.get('/app/cases/:id/check-your-answers', (req, res) => {
// 	var _case = helpers.getCase(req.session.cases, req.params.id);
// 	var pageObject = {
// 		casebar: helpers.getCaseBarObject(_case)
// 	};
// 	res.render('app/case/divorce/check-your-answers', pageObject);
// });

module.exports = router;