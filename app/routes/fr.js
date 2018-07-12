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
	pageObject.detailsRows.push([{ html: 'Case type' }, {html: helpers.getCaseTypeLabel(_case)}]);

	pageObject.linkedCaseRows = [];

	_case.linkedCases.forEach((item) => {
		pageObject.linkedCaseRows.push([{
			html: item.type
		}, {
			html: `<a href="/">${item.id}</a>`
		}])
	});

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

router.get('/app/cases/:id/fr/decision', (req, res) => {
  var _case = helpers.getCase(req.session.cases, req.params.id);

	var pageObject = {
		casebar: helpers.getCaseBarObject(_case),
		caseActions: helpers.getCaseActions(_case),
    backLink: {
      href: `/app/cases/${_case.id}`
    }
	};

	res.render('app/case/fr/decision/decision', pageObject);
});

router.post('/app/cases/:id/fr/decision', (req, res) => {
	if(req.body.approve === 'reject') {
		res.redirect(`/app/cases/${req.params.id}/fr/reject-reasons`);
	} else {
		res.redirect(`/app/cases/${req.params.id}/fr/upload-1`);
	}
});

router.get('/app/cases/:id/fr/upload-1', (req, res) => {
  var _case = helpers.getCase(req.session.cases, req.params.id);

	var pageObject = {
		casebar: helpers.getCaseBarObject(_case),
		caseActions: helpers.getCaseActions(_case),
    backLink: {
      href: `/app/cases/${_case.id}/fr/decision`
		},
		_case: _case
	};

	res.render('app/case/fr/decision/upload-1', pageObject);
});

router.post('/app/cases/:id/fr/upload-1', (req, res) => {
	switch(req.session.data.uploadnew) {
		case 'yes':
			res.redirect(`/app/cases/${req.params.id}/fr/upload-2`);
			break;
		case 'no':
			switch(req.session.data.decision) {
				case 'approve':
				case 'approve-with-changes':
					res.redirect(`/app/cases/${req.params.id}/fr/notes`);
					break;
				case 'reject':
					res.redirect(`/app/cases/${req.params.id}/fr/reject-reasons`);
					break;
			}
			break;
	}
});

router.get('/app/cases/:id/fr/upload-2', (req, res) => {
  var _case = helpers.getCase(req.session.cases, req.params.id);

	var pageObject = {
		casebar: helpers.getCaseBarObject(_case),
		caseActions: helpers.getCaseActions(_case),
    backLink: {
      href: `/app/cases/${_case.id}/fr/upload-1`
		},
		_case: _case
	};

	res.render('app/case/fr/decision/upload-2', pageObject);
});

router.post('/app/cases/:id/fr/upload-2', (req, res) => {
	switch(req.session.data.decision) {
		case 'approve-with-changes':
			res.redirect(`/app/cases/${req.params.id}/fr/notes`);
			break;
		case 'reject':
			res.redirect(`/app/cases/${req.params.id}/fr/reject-reasons`);
			break;
	}
});

router.get('/app/cases/:id/fr/notes', (req, res) => {
  var _case = helpers.getCase(req.session.cases, req.params.id);

	var pageObject = {
		casebar: helpers.getCaseBarObject(_case),
		caseActions: helpers.getCaseActions(_case),
    backLink: {
      href: `/app/cases/${_case.id}/fr/decision`
    }
	};

	res.render('app/case/fr/decision/notes', pageObject);
});

router.post('/app/cases/:id/fr/notes', (req, res) => {
	res.redirect(`/app/cases/${req.params.id}/fr/check`);
});

router.get('/app/cases/:id/fr/reject-reasons', (req, res) => {
  var _case = helpers.getCase(req.session.cases, req.params.id);

	var pageObject = {
		casebar: helpers.getCaseBarObject(_case),
		caseActions: helpers.getCaseActions(_case),
    backLink: {
      href: `/app/cases/${_case.id}`
    }
	};

	res.render('app/case/fr/decision/reject-reasons', pageObject);
});

router.post('/app/cases/:id/fr/reject-reasons', (req, res) => {
  res.redirect(`/app/cases/${req.params.id}/fr/notes`);
});

router.get('/app/cases/:id/fr/check', (req, res) => {
	var _case = helpers.getCase(req.session.cases, req.params.id);
	var pageObject = {
		casebar: helpers.getCaseBarObject(_case),
		caseActions: helpers.getCaseActions(_case),
		backLink: {
			href: `/app/cases/${_case.id}/fr/notes`
		},
		_case: _case
	};

	res.render('app/case/fr/decision/check', pageObject);
});

router.post('/app/cases/:id/fr/submit-decision', (req, res) => {
	res.redirect(`/app/cases/${req.params.id}/fr/decision-confirmation`);
});

router.get('/app/cases/:id/fr/decision-confirmation', (req, res) => {
	var _case = helpers.getCase(req.session.cases, req.params.id);
	var pageObject = {
		_case: _case
	};
	res.render('app/case/fr/decision/confirmation', pageObject);
});

module.exports = router;