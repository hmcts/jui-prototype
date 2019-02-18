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

	pageObject.detailsRows.push([{ html: 'Case number' },	{ html: _case.id }]);
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
  const reason = req.body.reason
	res.redirect('generate-order?decision=no&orderType=' + reason);
});

// Generate order
router.get('/app/cases/:id/divorce/generate-order', (req, res) => {
	var _case = helpers.getCase(req.session.cases, req.params.id);
	var pageObject = {
		casebar: helpers.getCaseBarObject(_case)
	};
	pageObject.orderType = req.query.orderType
	pageObject.costOrder = req.query.costOrder || 'no'
	pageObject.decision = req.query.decision
  pageObject.orderPdf = null
  if (pageObject.decision === 'yes' && pageObject.costOrder === 'yes') {
    pageObject.orderPdf = 'Costs order.pdf'
  } else if (pageObject.decision === 'yes' && pageObject.costOrder === 'no') {
    pageObject.orderPdf = 'WAITING FOR DOC'
  } else if (pageObject.decision === 'no') {
    pageObject.orderPdf = 'refusal-order.pdf'
  }
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
	res.render('app/case/divorce/decision/costs-order-1', pageObject);
});

router.post('/app/cases/:id/divorce/costs-order', (req, res) => {
  if (req.body['cost-order'] === 'yes') {
    res.redirect('costs-order-2');
  } else {
    res.redirect('generate-order?decision=yes&costOrder=no');
  }
});

router.get('/app/cases/:id/divorce/costs-order-2', (req, res) => {
  var _case = helpers.getCase(req.session.cases, req.params.id);
  var pageObject = {
    casebar: helpers.getCaseBarObject(_case),
    caseActions: helpers.getCaseActions(_case),
    backLink: {
      href: `/app/cases/${_case.id}/divorce/costs-order`
    },
    _case: _case
  };
  res.render('app/case/divorce/decision/costs-order-2', pageObject);
});

router.post('/app/cases/:id/divorce/costs-order-2', (req, res) => {
  const costsOrderDecision = req.body.costsOrderDecision
  if (req.body['costsOrderDecision'] === 'yes') {
    res.redirect('costs-order-2');
  } else {
    res.redirect('generate-order?decision=yes&orderType=' + costsOrderDecision + '&costOrder=yes');
  }
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