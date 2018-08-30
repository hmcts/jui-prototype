var express = require('express');
var router  = express.Router();
var helpers = require('./helpers');
var Validator = require('./validator');



// Is checked
function isChecked(req, name, value) {
	return req.session.data[name].indexOf(value) >= 0;
}


// Check and continue
function checkAndContinue(req, res, config) {
		
	// DAILY LIVING

	// 1. Preparing food
	if(config.preparingFood && isChecked(req, 'dailyliving', 'Preparing food')) {
		res.redirect(`/app/cases/${req.params.id}/pip/preliminary-decision/preparing-food`);

	// 2. Taking nutrition
	} else if (config.takingNutrition && isChecked(req, 'dailyliving', 'Taking nutrition')) {
		res.redirect(`/app/cases/${req.params.id}/pip/preliminary-decision/taking-nutrition`);

	// 3. Managing therapy or monitoring a health condition
	} else if (config.managingTherapy && isChecked(req, 'dailyliving', 'Managing therapy or monitoring a health condition')) {
		res.redirect(`/app/cases/${req.params.id}/pip/preliminary-decision/managing-therapy-or-monitoring-a-health-condition`);

	// 4. Washing and bathing
	} else if (config.washingAndBathing && isChecked(req, 'dailyliving', 'Washing and bathing')) {
		res.redirect(`/app/cases/${req.params.id}/pip/preliminary-decision/washing-and-bathing`);

	// 5. Managing toilet needs or incontinence
	} else if (config.managingToilet && isChecked(req, 'dailyliving', 'Managing toilet needs or incontinence')) {
		res.redirect(`/app/cases/${req.params.id}/pip/preliminary-decision/managing-toilet-needs-or-incontinence`);

	// 6. Dressing and undressing
	} else if (config.dressingAndUndressing && isChecked(req, 'dailyliving', 'Dressing and undressing')) {
		res.redirect(`/app/cases/${req.params.id}/pip/preliminary-decision/dressing-and-undressing`);
	
	// 7. Communicating verbally
	} else if (config.communicatingVerbally && isChecked(req, 'dailyliving', 'Communicating verbally')) {
		res.redirect(`/app/cases/${req.params.id}/pip/preliminary-decision/communicating-verbally`);

	// 8. Reading and understanding signs, symbols and words
	} else if (config.readingAndUnderstanding && isChecked(req, 'dailyliving', 'Reading and understanding signs, symbols and words')) {
		res.redirect(`/app/cases/${req.params.id}/pip/preliminary-decision/reading-and-understanding-signs-symbols-and-words`);

	// 9. Making budgeting decision
	} else if (config.makingDecisions && isChecked(req, 'dailyliving', 'Making budgeting decision')) {
		res.redirect(`/app/cases/${req.params.id}/pip/preliminary-decision/making-budgeting-decision`);
	
	
	// MOBILITY

	// 1. Planning and following journeys
	} else if (config.planningJourneys && isChecked(req, 'mobility', 'Planning and following journeys')) {
		res.redirect(`/app/cases/${req.params.id}/pip/preliminary-decision/planning-and-following-journeys`);

	// 2. Moving around
	} else if (config.movingAround && isChecked(req, 'mobility', 'Moving around')) {
		res.redirect(`/app/cases/${req.params.id}/pip/preliminary-decision/moving-around`);

	// Redirect to next step
	} else {
		res.redirect(`/app/cases/${req.params.id}/pip/preliminary-decision/panel-reasons`);
	}

}


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

	if(req.body.panelsdecision === 'yes') {
		res.redirect(`/app/cases/${req.params.id}/pip/preliminary-decision/scores`);
	} else {
		res.redirect(`/app/cases/${req.params.id}/pip/preliminary-decision/preview-decision`);
	}

});


// Scores
router.get('/app/cases/:id/pip/preliminary-decision/scores', (req, res) => {
	var _case = helpers.getCase(req.session.cases, req.params.id);
	var pageObject = {
		casebar: helpers.getCaseBarObject(_case),
		caseActions: helpers.getCaseActions(_case),
    backLink: {
      href: ''
		},
		_case: _case
	};
	res.render('app/case/pip/preliminary-decision/scores', pageObject);
});

router.post('/app/cases/:id/pip/preliminary-decision/scores', (req, res) => {

		checkAndContinue(req, res, {
			// DAILY LIVING
			preparingFood: true,
			takingNutrition: true,
			managingTherapy: true,
			washingAndBathing: true,
			managingToilet: true,
			dressingAndUndressing: true,
			communicatingVerbally: true,
			readingAndUnderstanding: true,
			makingDecisions: true,
			// MOBILITY
			planningJourneys: true,
			movingAround: true
		});

});



// 1. Preparing food
router.get('/app/cases/:id/pip/preliminary-decision/preparing-food', (req, res) => {
	var _case = helpers.getCase(req.session.cases, req.params.id);
	var pageObject = {
		casebar: helpers.getCaseBarObject(_case),
		caseActions: helpers.getCaseActions(_case),
    backLink: {
			href: ''
		},
	};
	res.render('app/case/pip/preliminary-decision/preparing-food', pageObject);
});

router.post('/app/cases/:id/pip/preliminary-decision/preparing-food', (req, res) => {

	checkAndContinue(req, res, {
			// DAILY LIVING
			preparingFood: false,
			takingNutrition: true,
			managingTherapy: true,
			washingAndBathing: true,
			managingToilet: true,
			dressingAndUndressing: true,
			communicatingVerbally: true,
			readingAndUnderstanding: true,
			makingDecisions: true,
			// MOBILITY
			planningJourneys: true,
			movingAround: true
	});

});


// 2. Taking nutrition
router.get('/app/cases/:id/pip/preliminary-decision/taking-nutrition', (req, res) => {
	var _case = helpers.getCase(req.session.cases, req.params.id);
	var pageObject = {
		casebar: helpers.getCaseBarObject(_case),
		caseActions: helpers.getCaseActions(_case),
    backLink: {
			href: ''
		}
	};
	res.render('app/case/pip/preliminary-decision/taking-nutrition', pageObject);
});

router.post('/app/cases/:id/pip/preliminary-decision/taking-nutrition', (req, res) => {

	checkAndContinue(req, res, {
		// DAILY LIVING
		preparingFood: false,
		takingNutrition: false,
		managingTherapy: true,
		washingAndBathing: true,
		managingToilet: true,
		dressingAndUndressing: true,
		communicatingVerbally: true,
		readingAndUnderstanding: true,
		// MOBILITY
		planningJourneys: true,
		movingAround: true
	});

});


// 3. Managing therapy or monitoring a health condition
router.get('/app/cases/:id/pip/preliminary-decision/managing-therapy-or-monitoring-a-health-condition', (req, res) => {
	var _case = helpers.getCase(req.session.cases, req.params.id);
	var pageObject = {
		casebar: helpers.getCaseBarObject(_case),
		caseActions: helpers.getCaseActions(_case),
    backLink: {
      href: `/app/cases/${_case.id}/pip/preliminary-decision`
		}
	};
	res.render('app/case/pip/preliminary-decision/managing-therapy-or-monitoring-a-health-condition', pageObject);
});

router.post('/app/cases/:id/pip/preliminary-decision/managing-therapy-or-monitoring-a-health-condition', (req, res) => {

	checkAndContinue(req, res, {
		// DAILY LIVING
		preparingFood: false,
		takingNutrition: false,
		managingTherapy: false,
		washingAndBathing: true,
		managingToilet: true,
		dressingAndUndressing: true,
		communicatingVerbally: true,
		readingAndUnderstanding: true,
		makingDecisions: true,
		// MOBILITY
		planningJourneys: true,
		movingAround: true
	});

});


// 4. Washing and bathing
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

	checkAndContinue(req, res, {
		preparingFood: false,
		takingNutrition: false,
		managingTherapy: false,
		washingAndBathing: false,
		managingToilet: true,
		dressingAndUndressing: true,
		communicatingVerbally: true,
		readingAndUnderstanding: true,
		makingDecisions: true,
		// MOBILITY
		planningJourneys: true,
		movingAround: true
	});

});


// 5. Managing toilet needs or incontinence
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

	checkAndContinue(req, res, {
		preparingFood: false,
		takingNutrition: false,
		managingTherapy: false,
		washingAndBathing: false,
		managingToilet: false,
		dressingAndUndressing: true,
		communicatingVerbally: true,
		readingAndUnderstanding: true,
		makingDecisions: true,
		// MOBILITY
		planningJourneys: true,
		movingAround: true
	});

});


// 6. Dressing and undressing
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

	checkAndContinue(req, res, {
		preparingFood: false,
		takingNutrition: false,
		managingTherapy: false,
		washingAndBathing: false,
		managingToilet: false,
		dressingAndUndressing: false,
		communicatingVerbally: true,
		readingAndUnderstanding: true,
		makingDecisions: true,
		// MOBILITY
		planningJourneys: true,
		movingAround: true
	});

});


// 7. Communicating verbally
router.get('/app/cases/:id/pip/preliminary-decision/communicating-verbally', (req, res) => {
	var _case = helpers.getCase(req.session.cases, req.params.id);
	var pageObject = {
		casebar: helpers.getCaseBarObject(_case),
		caseActions: helpers.getCaseActions(_case),
    backLink: {
      href: `/app/cases/${_case.id}/pip/preliminary-decision`
		}
	};
	res.render('app/case/pip/preliminary-decision/communicating-verbally', pageObject);
});

router.post('/app/cases/:id/pip/preliminary-decision/communicating-verbally', (req, res) => {

	checkAndContinue(req, res, {
		preparingFood: false,
		takingNutrition: false,
		managingTherapy: false,
		washingAndBathing: false,
		managingToilet: false,
		dressingAndUndressing: false,
		communicatingVerbally: false,
		readingAndUnderstanding: true,
		makingDecisions: true,
		// MOBILITY
		planningJourneys: true,
		movingAround: true
	});

});


// 8. Reading and understanding signs, symbols and words
router.get('/app/cases/:id/pip/preliminary-decision/reading-and-understanding-signs-symbols-and-words', (req, res) => {
	var _case = helpers.getCase(req.session.cases, req.params.id);
	var pageObject = {
		casebar: helpers.getCaseBarObject(_case),
		caseActions: helpers.getCaseActions(_case),
    backLink: {
      href: `/app/cases/${_case.id}/pip/preliminary-decision`
		}
	};
	res.render('app/case/pip/preliminary-decision/reading-and-understanding-signs-symbols-and-words', pageObject);
});

router.post('/app/cases/:id/pip/preliminary-decision/reading-and-understanding-signs-symbols-and-words', (req, res) => {

	checkAndContinue(req, res, {
		preparingFood: false,
		takingNutrition: false,
		managingTherapy: false,
		washingAndBathing: false,
		managingToilet: false,
		dressingAndUndressing: false,
		communicatingVerbally: false,
		readingAndUnderstanding: false,
		makingDecisions: true,
		// MOBILITY
		planningJourneys: true,
		movingAround: true
	});

});


// 9. Making budgeting decision
router.get('/app/cases/:id/pip/preliminary-decision/making-budgeting-decision', (req, res) => {
	var _case = helpers.getCase(req.session.cases, req.params.id);
	var pageObject = {
		casebar: helpers.getCaseBarObject(_case),
		caseActions: helpers.getCaseActions(_case),
    backLink: {
      href: `/app/cases/${_case.id}/pip/preliminary-decision`
		}
	};
	res.render('app/case/pip/preliminary-decision/making-budgeting-decision', pageObject);
});

router.post('/app/cases/:id/pip/preliminary-decision/making-budgeting-decision', (req, res) => {

	checkAndContinue(req, res, {
		preparingFood: false,
		takingNutrition: false,
		managingTherapy: false,
		washingAndBathing: false,
		managingToilet: false,
		dressingAndUndressing: false,
		communicatingVerbally: false,
		readingAndUnderstanding: false,
		makingDecisions: false,
		// MOBILITY
		planningJourneys: true,
		movingAround: true
	});

});


// 1. Planning and following journeys
router.get('/app/cases/:id/pip/preliminary-decision/planning-and-following-journeys', (req, res) => {
	var _case = helpers.getCase(req.session.cases, req.params.id);
	var pageObject = {
		casebar: helpers.getCaseBarObject(_case),
		caseActions: helpers.getCaseActions(_case),
    backLink: {
      href: `/app/cases/${_case.id}/pip/preliminary-decision`
		}
	};
	res.render('app/case/pip/preliminary-decision/planning-and-following-journeys', pageObject);
});

router.post('/app/cases/:id/pip/preliminary-decision/planning-and-following-journeys', (req, res) => {

	checkAndContinue(req, res, {
		preparingFood: false,
		takingNutrition: false,
		managingTherapy: false,
		washingAndBathing: false,
		managingToilet: false,
		dressingAndUndressing: false,
		communicatingVerbally: false,
		readingAndUnderstanding: false,
		makingDecisions: false,
		// MOBILITY
		planningJourneys: false,
		movingAround: true
	});

});


// 2. Moving around
router.get('/app/cases/:id/pip/preliminary-decision/moving-around', (req, res) => {
	var _case = helpers.getCase(req.session.cases, req.params.id);
	var pageObject = {
		casebar: helpers.getCaseBarObject(_case),
		caseActions: helpers.getCaseActions(_case),
    backLink: {
      href: `/app/cases/${_case.id}/pip/preliminary-decision`
		}
	};
	res.render('app/case/pip/preliminary-decision/moving-around', pageObject);
});

router.post('/app/cases/:id/pip/preliminary-decision/movong-around', (req, res) => {

	checkAndContinue(req, res, {
		preparingFood: false,
		takingNutrition: false,
		managingTherapy: false,
		washingAndBathing: false,
		managingToilet: false,
		dressingAndUndressing: false,
		communicatingVerbally: false,
		readingAndUnderstanding: false,
		makingDecisions: false,
		// MOBILITY
		planningJourneys: false,
		movingAround: false
	});

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


// Decision submitted
router.get('/app/cases/:id/pip/preliminary-decision/decision-submitted', (req, res) => {
  var _case = helpers.getCase(req.session.cases, req.params.id);
	var pageObject = {
		casebar: helpers.getCaseBarObject(_case),
		caseActions: helpers.getCaseActions(_case),
    backLink: {
      href: `/app/cases/${_case.id}/pip/preliminary-decision`
		},
		_case: _case
	};
	res.render('app/case/pip/preliminary-decision/decision-submitted', pageObject);
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