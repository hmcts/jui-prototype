var express = require('express');
var router  = express.Router();
var helpers = require('./helpers');
var Validator = require('./validator');


// Summary
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
	pageObject.detailsRows.push([{ html: 'Parties' }, {html: helpers.getPartiesLineSummary(_case)}]);
	pageObject.detailsRows.push([{ html: 'Case number' }, {html: _case.id}]);
	pageObject.detailsRows.push([{ html: 'Case type' }, {html: helpers.getCaseTypeLabel(_case)}]);
	pageObject.detailsRows.push([{ html: 'Tribunal centre' }, {html: _case.tribunalCentre}]);
	pageObject.detailsRows.push([{ html: 'Additional requirements' }, {html: _case.requirements}]);

	res.render('app/case/pip/summary', pageObject);
});


// Timeline
router.get('/app/cases/:id/pip/timeline', (req, res) => {

	var _case = helpers.getCase(req.session.cases, req.params.id);

	var pageObject = {
		_case: _case,
		casebar: helpers.getCaseBarObject(_case),
		caseNavItems: helpers.getCaseNavItems(_case, 'timeline'),
		caseActions: helpers.getCaseActions(_case),
		events: helpers.getEvents(_case)
	};

	res.render('app/case/pip/timeline', pageObject);

});




// Make a preliminary decision
router.get('/app/cases/:id/pip/preliminary-decision', (req, res) => {
	
	var _case = helpers.getCase(req.session.cases, req.params.id);

	var pageObject = {
		casebar: helpers.getCaseBarObject(_case),
		caseActions: helpers.getCaseActions(_case),
		backLink: {
			href: `/app/cases/${_case.id}`
		},
		_case: _case
	};

	res.render('app/case/pip/preliminary-decision/make-decision', pageObject);

});

router.post('/app/cases/:id/pip/preliminary-decision', (req, res) => {

	if(req.body.panelsDecision === 'Yes') {
		res.redirect(`/app/cases/${req.params.id}/pip/preliminary-decision/scores`);
	} else {
		res.redirect(`/app/cases/${req.params.id}/pip/preliminary-decision/no`);
	}

});



// On which sections did you give a different score to DWP?
router.get('/app/cases/:id/pip/preliminary-decision/scores', (req, res) => {
  var _case = helpers.getCase(req.session.cases, req.params.id);
	var pageObject = {
		casebar: helpers.getCaseBarObject(_case),
		caseActions: helpers.getCaseActions(_case),
    backLink: {
      href: `/app/cases/${_case.id}/pip/preliminary-decision`
    }
	};
	res.render('app/case/pip/preliminary-decision/scores', pageObject);
});

router.post('/app/cases/:id/pip/preliminary-decision/scores', (req, res) => {

	//if(req.body['daily-living'] == 'Preparing food') {
		res.redirect(`/app/cases/${req.params.id}/pip/preliminary-decision/preparing-food`);
	//}

});



// Enter the panel’s new scores (preparing food)
router.get('/app/cases/:id/pip/preliminary-decision/preparing-food', (req, res) => {
	
	var _case = helpers.getCase(req.session.cases, req.params.id);
	
	var pageObject = {
		casebar: helpers.getCaseBarObject(_case),
		caseActions: helpers.getCaseActions(_case),
    backLink: {
      href: `/app/cases/${_case.id}/pip/preliminary-decision`
		}
	};

	res.render('app/case/pip/preliminary-decision/preparing-food', pageObject);

});

router.post('/app/cases/:id/pip/preliminary-decision/preparing-food', (req, res) => {
	res.redirect(`/app/cases/${req.params.id}/pip/preliminary-decision/washing-and-bathing`);
});


router.get('/app/cases/:id/pip/preliminary-decision/washing-and-bathing', (req, res) => {
	
	var _case = helpers.getCase(req.session.cases, req.params.id);
	
	var pageObject = {
		casebar: helpers.getCaseBarObject(_case),
		caseActions: helpers.getCaseActions(_case),
    backLink: {
      href: `/app/cases/${_case.id}/pip/preliminary-decision`
		}
	};

	res.render('app/case/pip/preliminary-decision/washing-and-bathing', pageObject);

});

router.post('/app/cases/:id/pip/preliminary-decision/washing-and-bathing', (req, res) => {
	res.redirect(`/app/cases/${req.params.id}/pip/preliminary-decision/managing-toilet-needs-or-incontinence`);
});


router.get('/app/cases/:id/pip/preliminary-decision/managing-toilet-needs-or-incontinence', (req, res) => {
	
	var _case = helpers.getCase(req.session.cases, req.params.id);
	
	var pageObject = {
		casebar: helpers.getCaseBarObject(_case),
		caseActions: helpers.getCaseActions(_case),
    backLink: {
      href: `/app/cases/${_case.id}/pip/preliminary-decision`
		}
	};

	res.render('app/case/pip/preliminary-decision/managing-toilet-needs-or-incontinence', pageObject);

});

router.post('/app/cases/:id/pip/preliminary-decision/managing-toilet-needs-or-incontinence', (req, res) => {
	res.redirect(`/app/cases/${req.params.id}/pip/preliminary-decision/dressing-and-undressing`);
});


router.get('/app/cases/:id/pip/preliminary-decision/dressing-and-undressing', (req, res) => {
	
	var _case = helpers.getCase(req.session.cases, req.params.id);
	
	var pageObject = {
		casebar: helpers.getCaseBarObject(_case),
		caseActions: helpers.getCaseActions(_case),
    backLink: {
      href: `/app/cases/${_case.id}/pip/preliminary-decision`
		}
	};

	res.render('app/case/pip/preliminary-decision/dressing-and-undressing', pageObject);

});

router.post('/app/cases/:id/pip/preliminary-decision/dressing-and-undressing', (req, res) => {
	res.redirect(`/app/cases/${req.params.id}/pip/preliminary-decision/panel-reasons`);
});



// Panel reasons
router.get('/app/cases/:id/pip/preliminary-decision/panel-reasons', (req, res) => {
  var _case = helpers.getCase(req.session.cases, req.params.id);
	var pageObject = {
		casebar: helpers.getCaseBarObject(_case),
		caseActions: helpers.getCaseActions(_case),
    backLink: {
      href: `/app/cases/${_case.id}/pip/preliminary-decision`
    }
	};
	res.render('app/case/pip/preliminary-decision/panel-reasons', pageObject);
});

router.post('/app/cases/:id/pip/preliminary-decision/panel-reasons', (req, res) => {
	res.redirect(`/app/cases/${req.params.id}/pip/preliminary-decision/preview-decision`);
});



// Preview decision
router.get('/app/cases/:id/pip/preliminary-decision/preview-decision', (req, res) => {
  var _case = helpers.getCase(req.session.cases, req.params.id);
	var pageObject = {
		casebar: helpers.getCaseBarObject(_case),
		caseActions: helpers.getCaseActions(_case),
    backLink: {
      href: `/app/cases/${_case.id}/pip/preliminary-decision`
    }
	};
	res.render('app/case/pip/preliminary-decision/preview-decision', pageObject);
});







// Make decision
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
			},
			_case: _case
		};
		res.render('app/case/pip/decision/decision', pageObject);
	}
});


// Check decision
router.get('/app/cases/:id/pip/check-decision', (req, res) => {
	var _case = helpers.getCase(req.session.cases, req.params.id);
	var pageObject = {
		casebar: helpers.getCaseBarObject(_case),
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


// Decision confirmation
router.get('/app/cases/:id/pip/decision-confirmation', (req, res) => {
	var _case = helpers.getCase(req.session.cases, req.params.id);
	var pageObject = {
		_case: _case
	};
	res.render('app/case/pip/decision/confirmation', pageObject);
});


// List for hearing
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


// Check hearing notes
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


// Hearing confirmation
router.get('/app/cases/:id/pip/hearing-confirmation', (req, res) => {
	var _case = helpers.getCase(req.session.cases, req.params.id);
	var pageObject = {
		_case: _case
	};
	res.render('app/case/pip/list-for-hearing/confirmation', pageObject);
});


module.exports = router;