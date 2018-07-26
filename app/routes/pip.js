var express = require('express');
var router  = express.Router();
var helpers = require('./helpers');
var Validator = require('./validator');

router.get('/app/cases/:id/pip', (req, res) => {
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
	pageObject.detailsRows.push([{ html: 'Tribunal centre' }, {html: _case.tribunalCentre}]);
	pageObject.detailsRows.push([{ html: 'Additional requirements' }, {html: _case.requirements}]);

	res.render('app/case/pip/summary', pageObject);
});

router.get('/app/cases/:id/pip/make-decision', (req, res) => {
  var _case = helpers.getCase(req.session.cases, req.params.id);

	var pageObject = {
		casebar: helpers.getCaseBarObject(_case),
		caseActions: helpers.getCaseActions(_case),
    backLink: {
      href: `/app/cases/${_case.id}`
    }
	};

	res.render('app/case/pip/decision/decision', pageObject);
});

router.post('/app/cases/:id/pip/make-decision', (req, res) => {

	var v = new Validator(req, res);
	v.add('decision-notes', [{
		fn: (value) => {
			return value.trim().length > 0;
		},
		message: 'Enter your decision notes'
	}]);

	if(v.validate()) {
		res.redirect(`/app/cases/${req.params.id}/pip/check-decision`);
	} else {
		var _case = helpers.getCase(req.session.cases, req.params.id);
		var pageObject = {
			casebar: helpers.getCaseBarObject(_case),
			caseActions: helpers.getCaseActions(_case),
			backLink: {
				href: `/app/cases/${_case.id}`
			}
		};
		res.render('app/case/pip/decision/decision', pageObject);
	}
});

router.get('/app/cases/:id/pip/check-decision', (req, res) => {
	var _case = helpers.getCase(req.session.cases, req.params.id);
	var pageObject = {
		backLink: {
			href: `/app/cases/${_case.id}/pip/make-decision/`
		},
		_case: _case
	};

	res.render('app/case/pip/decision/check', pageObject);
});

router.post('/app/cases/:id/pip/submit-decision', (req, res) => {
	res.redirect(`/app/cases/${req.params.id}/pip/decision-confirmation`);
});

router.get('/app/cases/:id/pip/decision-confirmation', (req, res) => {
	var _case = helpers.getCase(req.session.cases, req.params.id);
	var pageObject = {
		_case: _case
	};
	res.render('app/case/pip/decision/confirmation', pageObject);
});

router.get('/app/cases/:id/pip/list-for-hearing', (req, res) => {
  var _case = helpers.getCase(req.session.cases, req.params.id);

	var pageObject = {
		casebar: helpers.getCaseBarObject(_case),
		caseActions: helpers.getCaseActions(_case),
    backLink: {
      href: `/app/cases/${_case.id}`
    }
	};

	res.render('app/case/pip/list-for-hearing/notes', pageObject);
});

router.post('/app/cases/:id/pip/list-for-hearing', (req, res) => {
  res.redirect(`/app/cases/${req.params.id}/pip/check-hearing-notes`);
});

router.get('/app/cases/:id/pip/check-hearing-notes', (req, res) => {
	var _case = helpers.getCase(req.session.cases, req.params.id);
	var pageObject = {
		casebar: helpers.getCaseBarObject(_case),
		caseActions: helpers.getCaseActions(_case),
		backLink: {
			href: `/app/cases/${_case.id}/pip/list-for-hearing`
		},
		_case: _case
	};

	res.render('app/case/pip/list-for-hearing/check', pageObject);
});

router.post('/app/cases/:id/pip/submit-for-hearing', (req, res) => {
	res.redirect(`/app/cases/${req.params.id}/pip/hearing-confirmation`);
});

router.get('/app/cases/:id/pip/hearing-confirmation', (req, res) => {
	var _case = helpers.getCase(req.session.cases, req.params.id);
	var pageObject = {
		_case: _case
	};
	res.render('app/case/pip/list-for-hearing/confirmation', pageObject);
});


module.exports = router;