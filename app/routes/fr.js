var express = require('express');
var router  = express.Router();
var helpers = require('./helpers');
var Validator = require('./validator');

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
	pageObject.detailsRows.push([{ html: 'Decree nisi granted' }, {html: helpers.getFormattedDate(_case.decreeDate)}]);

	pageObject.linkedCaseRows = [];

	_case.linkedCases.forEach((item) => {
		pageObject.linkedCaseRows.push([{
			html: item.type
		}, {
			html: `<a href="/app/cases/${item.id}">${item.id}</a>`
		}]);
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
	var v = new Validator(req, res);
	v.add('decision', [{
		fn: (value) => {
			var valid = true;
			if(!value || value.trim().length ==  0) {
				valid = false;
			}
			return valid;
		},
		message: 'Select your decision'
	}]);

	if(v.validate()) {
		
		// Approve consent order as drafted
		if(req.body.decision === 'Approve consent order as drafted') {

			res.redirect(`/app/cases/${req.params.id}/fr/decision-notes`);

		
		} else if(req.body.decision === 'Ask for more information') {

			res.redirect(`/app/cases/${req.params.id}/fr/more-information`);

		} else if(req.body.decision === 'Request changes or ask for more information from parties') {

			res.redirect(`/app/cases/${req.params.id}/fr/reject-reasons`);

		// Ask parties to attend hearing
		} else if(req.body.decision === 'Ask parties to attend hearing') {

			res.redirect(`/app/cases/${req.params.id}/fr/hearing-details`);

		// Reject consent order
		} else if(req.body.decision === 'Reject consent order') {

			res.redirect(`/app/cases/${req.params.id}/fr/reject-reason`);

		}

	} else {
			var _case = helpers.getCase(req.session.cases, req.params.id);
			var pageObject = {
				casebar: helpers.getCaseBarObject(_case),
				caseActions: helpers.getCaseActions(_case),
				backLink: {
					href: `/app/cases/${_case.id}`
				}
			};
			res.render('app/case/fr/decision/decision', pageObject);
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
	if(req.body.uploadnew == 'Yes') {
		res.redirect(`/app/cases/${req.params.id}/fr/upload-2`);
	} else {
		switch(req.session.data.decision) {
			case 'Approve consent order':
			case 'Ask for more information':
				res.redirect(`/app/cases/${req.params.id}/fr/notes`);
				break;
			case 'Reject consent order':
				res.redirect(`/app/cases/${req.params.id}/fr/reject-reasons`);
				break;
		}
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
	if(req.session.data.decision === 'Ask for more information') {
		res.redirect(`/app/cases/${req.params.id}/fr/notes`);
	} else {
		res.redirect(`/app/cases/${req.params.id}/fr/reject-reasons`);
	}
});



router.get('/app/cases/:id/fr/more-information', (req, res) => {
  var _case = helpers.getCase(req.session.cases, req.params.id);

	var pageObject = {
		casebar: helpers.getCaseBarObject(_case),
		caseActions: helpers.getCaseActions(_case),
    backLink: {
      href: `/app/cases/${_case.id}/fr/decision`
		},
		_case: _case
	};

	res.render('app/case/fr/decision/more-information', pageObject);
});

router.post('/app/cases/:id/fr/more-information', (req, res) => {
	res.redirect(`/app/cases/${req.params.id}/fr/check`);
});


// Decision notes
router.get('/app/cases/:id/fr/decision-notes', (req, res) => {
  var _case = helpers.getCase(req.session.cases, req.params.id);
	var pageObject = {
		casebar: helpers.getCaseBarObject(_case),
		caseActions: helpers.getCaseActions(_case),
    backLink: {
      href: `/app/cases/${_case.id}/fr/decision`
    }
	};
	res.render('app/case/fr/decision/decision-notes', pageObject);
});

router.post('/app/cases/:id/fr/decision-notes', (req, res) => {
	res.redirect(`/app/cases/${req.params.id}/fr/check`);
});


// Hearing details
router.get('/app/cases/:id/fr/hearing-details', (req, res) => {
  var _case = helpers.getCase(req.session.cases, req.params.id);
	var pageObject = {
		casebar: helpers.getCaseBarObject(_case),
		caseActions: helpers.getCaseActions(_case),
    backLink: {
      href: `/app/cases/${_case.id}/fr/decision`
		},
		_case: _case
	};
	res.render('app/case/fr/decision/hearing-details', pageObject);
});

router.post('/app/cases/:id/fr/hearing-details', (req, res) => {
	res.redirect(`/app/cases/${req.params.id}/fr/check`);
});


// Draft consent order`
router.get('/app/cases/:id/fr/draft-consent-order', (req, res) => {
  var _case = helpers.getCase(req.session.cases, req.params.id);
	var pageObject = {
		casebar: helpers.getCaseBarObject(_case),
		caseActions: helpers.getCaseActions(_case),
    backLink: {
      href: `/app/cases/${_case.id}/fr/decision`
    }
	};
	res.render('app/case/fr/decision/draft-consent-order', pageObject);
});

router.post('/app/cases/:id/fr/draft-consent-order', (req, res) => {
	res.redirect(`/app/cases/${req.params.id}/fr/check`);
});



// Reject reasons
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
	res.redirect(`/app/cases/${req.params.id}/fr/draft-consent-order`);
});



// Reject reason
router.get('/app/cases/:id/fr/reject-reason', (req, res) => {
  var _case = helpers.getCase(req.session.cases, req.params.id);
	var pageObject = {
		casebar: helpers.getCaseBarObject(_case),
		caseActions: helpers.getCaseActions(_case),
    backLink: {
      href: `/app/cases/${_case.id}`
    }
	};
	res.render('app/case/fr/decision/reject-reason', pageObject);
});

router.post('/app/cases/:id/fr/reject-reason', (req, res) => {
	res.redirect(`/app/cases/${req.params.id}/fr/check`);
});



// Reject reasons
router.get('/app/cases/:id/fr/reject-notes', (req, res) => {
  var _case = helpers.getCase(req.session.cases, req.params.id);
	var pageObject = {
		casebar: helpers.getCaseBarObject(_case),
		caseActions: helpers.getCaseActions(_case),
    backLink: {
      href: `/app/cases/${_case.id}`
    }
	};
	res.render('app/case/fr/decision/reject-notes', pageObject);
});

router.post('/app/cases/:id/fr/reject-notes', (req, res) => {
  res.redirect(`/app/cases/${req.params.id}/fr/check`);
});



router.get('/app/cases/:id/fr/check', (req, res) => {
	var _case = helpers.getCase(req.session.cases, req.params.id);
	var pageObject = {
		casebar: helpers.getCaseBarObject(_case),
		caseActions: helpers.getCaseActions(_case),
		backLink: {
			href: `/app/cases/${_case.id}/fr/notes`
		},
		_case: _case,
		reasons: []
	};

	if(req.session.data.decision === 'List for hearing') {
		pageObject.backLink.href = `/app/cases/${_case.id}/fr/hearing-details`;
	}

	if(req.session.data.reject) {
		req.session.data.reject.forEach((item) => {
			if(item == 'Not enough information given') {
				// loop through sub reasons and attach as sub reasons
				var r = {
					text: 'Not enough information given',
					sub: []
				};

				req.session.data.rejectsub.forEach((item) => {
					r.sub.push({
						text: item
					});
				});
				pageObject.reasons.push(r);
			} else if (item == 'Other') {
				// grab other text input and add as reason
				pageObject.reasons.push({
					text: `Other: ${req.session.data.otherReason}`
				});
			} else {
				pageObject.reasons.push({
					text: item
				});
			}
		});
	}

	res.render('app/case/fr/decision/check', pageObject);
});

router.post('/app/cases/:id/fr/submit-decision', (req, res) => {
	res.redirect(`/app/cases/${req.params.id}/fr/decision-confirmation`);
});



router.get('/app/cases/:id/fr/draft-consent-order', (req, res) => {
  var _case = helpers.getCase(req.session.cases, req.params.id);
	var pageObject = {
		casebar: helpers.getCaseBarObject(_case),
		caseActions: helpers.getCaseActions(_case),
    backLink: {
      href: `/app/cases/${_case.id}`
    }
	};
	res.render('app/case/fr/decision/draft-consent-order', pageObject);
});

router.post('/app/cases/:id/fr/draft-consent-order', (req, res) => {
  res.redirect(`/app/cases/${req.params.id}/fr/check`);
});



router.get('/app/cases/:id/fr/decision-confirmation', (req, res) => {
	var _case = helpers.getCase(req.session.cases, req.params.id);
	var pageObject = {
		_case: _case
	};
	res.render('app/case/fr/decision/confirmation', pageObject);
});



module.exports = router;