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

	// 1. Preparing food
	if(config.preparingFood && isChecked(req, 'dailyliving', 'Preparing food')) {
		res.redirect(`/app/cases/${req.params.id}/pip/decision/preliminary/preparing-food`);

  // 2. Taking nutrition
  } else if (config.takingNutrition && isChecked(req, 'dailyliving', 'Taking nutrition')) {
    res.redirect(`/app/cases/${req.params.id}/pip/decision/preliminary/taking-nutrition`);

  // 3. Managing therapy or monitoring a health condition
  } else if (config.managingTherapy && isChecked(req, 'dailyliving', 'Managing therapy')) {
    res.redirect(`/app/cases/${req.params.id}/pip/decision/preliminary/managing-therapy`);

  // 4. Washing and bathing
  } else if (config.washingAndBathing && isChecked(req, 'dailyliving', 'Washing and bathing')) {
    res.redirect(`/app/cases/${req.params.id}/pip/decision/preliminary/washing-bathing`);

  // 5. Managing toilet needs or incontinence
  } else if (config.managingToilet && isChecked(req, 'dailyliving', 'Managing toilet')) {
    res.redirect(`/app/cases/${req.params.id}/pip/decision/preliminary/managing-toilet`);

  // 6. Dressing and undressing
  } else if (config.dressingAndUndressing && isChecked(req, 'dailyliving', 'Dressing and undressing')) {
    res.redirect(`/app/cases/${req.params.id}/pip/decision/preliminary/dressing-undressing`);

  // 7. Communicating verbally
  } else if (config.communicatingVerbally && isChecked(req, 'dailyliving', 'Communicating verbally')) {
    res.redirect(`/app/cases/${req.params.id}/pip/decision/preliminary/communicating-verbally`);

  // 8. Reading and understanding signs, symbols and words
  } else if (config.readingAndUnderstanding && isChecked(req, 'dailyliving', 'Reading signs')) {
    res.redirect(`/app/cases/${req.params.id}/pip/decision/preliminary/reading-signs`);

  // 9. Engaging with other people face to face
  } else if (config.engagingFace && isChecked(req, 'dailyliving', 'Engaging face')) {
    res.redirect(`/app/cases/${req.params.id}/pip/decision/preliminary/engaging-face`);

  // 10. Making budgeting decision
  } else if (config.makingDecisions && isChecked(req, 'dailyliving', 'Making budgeting')) {
    res.redirect(`/app/cases/${req.params.id}/pip/decision/preliminary/budgeting-decision`);


  // 1. Planning and following journeys
  } else if (config.planningJourneys && isChecked(req, 'mobility', 'Planning journeys')) {
    res.redirect(`/app/cases/${req.params.id}/pip/decision/preliminary/planning-journeys`);

  // 2. Moving around
  } else if (config.movingAround && isChecked(req, 'mobility', 'Moving around')) {
    res.redirect(`/app/cases/${req.params.id}/pip/decision/preliminary/moving-around`);


    // Redirect
    } else {
      res.redirect(`/app/cases/${req.params.id}/pip/decision/preliminary/panel-reasons`);
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
		casebar: helpers.getCaseBarObject(_case),
		caseNavItems: helpers.getCaseNavItems(_case, 'timeline'),
		caseActions: helpers.getCaseActions(_case),
    events: helpers.getEvents(_case),
    _case: _case
	};
	res.render('app/case/pip/timeline', pageObject);
});


// DECISION: What do you want to issue?
router.get('/app/cases/:id/pip/decision', (req, res) => {
	var _case = helpers.getCase(req.session.cases, req.params.id);
  var pageObject = {
		casebar: helpers.getCaseBarObject(_case),
		caseActions: helpers.getCaseActions(_case),
		backLink: {
			href: `/app/cases/${_case.id}`
		},
		_case: _case
	};
	res.render('app/case/pip/decision/index', pageObject);
});

router.post('/app/cases/:id/pip/decision', (req, res) => {

	if(req.body.whatissue === 'preliminary') {
		res.redirect(`/app/cases/${req.params.id}/pip/decision/preliminary`);
	} else {
		res.redirect(`/app/cases/${req.params.id}/pip/decision/final`);
	}

});


// PRELIMINARY: Preliminary view
router.get('/app/cases/:id/pip/decision/preliminary', (req, res) => {
	var _case = helpers.getCase(req.session.cases, req.params.id);
	var pageObject = {
		casebar: helpers.getCaseBarObject(_case),
		caseActions: helpers.getCaseActions(_case),
		backLink: {
      href: `/app/cases/${_case.id}/pip/decision`
		},
		_case: _case
	};
	res.render('app/case/pip/decision/preliminary/index', pageObject);
});

router.post('/app/cases/:id/pip/decision/preliminary', (req, res) => {

  if(req.body.awardliving === 'No award' && req.body.awardmobility === 'No award') {
		res.redirect(`/app/cases/${req.params.id}/pip/decision/preliminary/scores`);
	} else {
		res.redirect(`/app/cases/${req.params.id}/pip/decision/preliminary/set-award-dates`);
	}

});


// PRELIMINARY: Set award dates
router.get('/app/cases/:id/pip/decision/preliminary/set-award-dates', (req, res) => {
	var _case = helpers.getCase(req.session.cases, req.params.id);
	var pageObject = {
		casebar: helpers.getCaseBarObject(_case),
		caseActions: helpers.getCaseActions(_case),
		backLink: {
      href: `/app/cases/${_case.id}/pip/decision`
		},
		_case: _case
	};
	res.render('app/case/pip/decision/preliminary/set-award-dates', pageObject);
});

router.post('/app/cases/:id/pip/decision/preliminary/set-award-dates', (req, res) => {
	res.redirect(`/app/cases/${req.params.id}/pip/decision/preliminary/scores`);
});


// PRELIMINARY: Scores
router.get('/app/cases/:id/pip/decision/preliminary/scores', (req, res) => {
	var _case = helpers.getCase(req.session.cases, req.params.id);
	var pageObject = {
		casebar: helpers.getCaseBarObject(_case),
		caseActions: helpers.getCaseActions(_case),
    backLink: {
      href: `/app/cases/${_case.id}/pip/decision/preliminary`
		},
		_case: _case
	};
	res.render('app/case/pip/decision/preliminary/scores', pageObject);
});

router.post('/app/cases/:id/pip/decision/preliminary/scores', (req, res) => {

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
    engagingFace: true,
    makingDecisions: true,
    // MOBILITY
    planningJourneys: true,
    movingAround: true
  });

});


// 1. PRELIMINARY: Preparing food
router.get('/app/cases/:id/pip/decision/preliminary/preparing-food', (req, res) => {
	var _case = helpers.getCase(req.session.cases, req.params.id);
	var pageObject = {
		casebar: helpers.getCaseBarObject(_case),
		caseActions: helpers.getCaseActions(_case),
    backLink: {
			href: ''
    },
    _case: _case
	};
	res.render('app/case/pip/decision/preliminary/preparing-food', pageObject);
});

router.post('/app/cases/:id/pip/decision/preliminary/preparing-food', (req, res) => {

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
    engagingFace: true,
    makingDecisions: true,
    // MOBILITY
    planningJourneys: true,
    movingAround: true
  });

});


// 2. PRELIMINARY: Taking nutrition
router.get('/app/cases/:id/pip/decision/preliminary/taking-nutrition', (req, res) => {
	var _case = helpers.getCase(req.session.cases, req.params.id);
	var pageObject = {
		casebar: helpers.getCaseBarObject(_case),
		caseActions: helpers.getCaseActions(_case),
    backLink: {
			href: ''
    },
    _case: _case
	};
	res.render('app/case/pip/decision/preliminary/taking-nutrition', pageObject);
});

router.post('/app/cases/:id/pip/decision/preliminary/taking-nutrition', (req, res) => {

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
    engagingFace: true,
		// MOBILITY
		planningJourneys: true,
    movingAround: true
	});

});


// 3. PRELIMINARY: Managing therapy or monitoring a health condition
router.get('/app/cases/:id/pip/decision/preliminary/managing-therapy', (req, res) => {
	var _case = helpers.getCase(req.session.cases, req.params.id);
	var pageObject = {
		casebar: helpers.getCaseBarObject(_case),
		caseActions: helpers.getCaseActions(_case),
    backLink: {
      href: `/app/cases/${_case.id}/pip/preliminary-decision`
    },
    _case: _case
	};
	res.render('app/case/pip/decision/preliminary/managing-therapy', pageObject);
});

router.post('/app/cases/:id/pip/decision/preliminary/managing-therapy', (req, res) => {

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
    engagingFace: true,
		makingDecisions: true,
		// MOBILITY
		planningJourneys: true,
    movingAround: true
	});

});


// 4. PRELIMINARY: Washing and bathing
router.get('/app/cases/:id/pip/decision/preliminary/washing-bathing', (req, res) => {
	var _case = helpers.getCase(req.session.cases, req.params.id);
	var pageObject = {
		casebar: helpers.getCaseBarObject(_case),
		caseActions: helpers.getCaseActions(_case),
    backLink: {
      href: `/app/cases/${_case.id}/pip/preliminary-decision`
    },
    _case: _case
	};
	res.render('app/case/pip/decision/preliminary/washing-bathing', pageObject);
});

router.post('/app/cases/:id/pip/decision/preliminary/washing-bathing', (req, res) => {

	checkAndContinue(req, res, {
		preparingFood: false,
		takingNutrition: false,
		managingTherapy: false,
		washingAndBathing: false,
		managingToilet: true,
		dressingAndUndressing: true,
		communicatingVerbally: true,
    readingAndUnderstanding: true,
    engagingFace: true,
		makingDecisions: true,
		// MOBILITY
		planningJourneys: true,
    movingAround: true
	});

});


// 5. PRELIMINARY: Managing toilet needs or incontinence
router.get('/app/cases/:id/pip/decision/preliminary/managing-toilet', (req, res) => {
	var _case = helpers.getCase(req.session.cases, req.params.id);
	var pageObject = {
		casebar: helpers.getCaseBarObject(_case),
		caseActions: helpers.getCaseActions(_case),
    backLink: {
      href: `/app/cases/${_case.id}/pip/preliminary-decision`
    },
    _case: _case
	};
	res.render('app/case/pip/decision/preliminary/managing-toilet', pageObject);
});

router.post('/app/cases/:id/pip/decision/preliminary/managing-toilet', (req, res) => {

	checkAndContinue(req, res, {
		preparingFood: false,
		takingNutrition: false,
		managingTherapy: false,
		washingAndBathing: false,
		managingToilet: false,
		dressingAndUndressing: true,
		communicatingVerbally: true,
    readingAndUnderstanding: true,
    engagingFace: true,
		makingDecisions: true,
		// MOBILITY
		planningJourneys: true,
    movingAround: true
	});

});


// 6. PRELIMINARY: Dressing and undressing
router.get('/app/cases/:id/pip/decision/preliminary/dressing-undressing', (req, res) => {
	var _case = helpers.getCase(req.session.cases, req.params.id);
	var pageObject = {
		casebar: helpers.getCaseBarObject(_case),
		caseActions: helpers.getCaseActions(_case),
    backLink: {
      href: `/app/cases/${_case.id}/pip/preliminary-decision`
    },
    _case: _case
	};
	res.render('app/case/pip/decision/preliminary/dressing-undressing', pageObject);
});

router.post('/app/cases/:id/pip/decision/preliminary/dressing-undressing', (req, res) => {

	checkAndContinue(req, res, {
		preparingFood: false,
		takingNutrition: false,
		managingTherapy: false,
		washingAndBathing: false,
		managingToilet: false,
		dressingAndUndressing: false,
		communicatingVerbally: true,
    readingAndUnderstanding: true,
    engagingFace: true,
		makingDecisions: true,
		// MOBILITY
		planningJourneys: true,
    movingAround: true
	});

});


// 7. PRELIMINARY: Communicating verbally
router.get('/app/cases/:id/pip/decision/preliminary/communicating-verbally', (req, res) => {
	var _case = helpers.getCase(req.session.cases, req.params.id);
	var pageObject = {
		casebar: helpers.getCaseBarObject(_case),
		caseActions: helpers.getCaseActions(_case),
    backLink: {
      href: `/app/cases/${_case.id}/pip/preliminary-decision`
    },
    _case: _case
	};
	res.render('app/case/pip/decision/preliminary/communicating-verbally', pageObject);
});

router.post('/app/cases/:id/pip/decision/preliminary/communicating-verbally', (req, res) => {

	checkAndContinue(req, res, {
		preparingFood: false,
		takingNutrition: false,
		managingTherapy: false,
		washingAndBathing: false,
		managingToilet: false,
		dressingAndUndressing: false,
		communicatingVerbally: false,
    readingAndUnderstanding: true,
    engagingFace: true,
		makingDecisions: true,
		// MOBILITY
		planningJourneys: true,
    movingAround: true
	});

});


// 8. PRELIMINARY: Reading and understanding signs, symbols and words
router.get('/app/cases/:id/pip/decision/preliminary/reading-signs', (req, res) => {
	var _case = helpers.getCase(req.session.cases, req.params.id);
	var pageObject = {
		casebar: helpers.getCaseBarObject(_case),
		caseActions: helpers.getCaseActions(_case),
    backLink: {
      href: `/app/cases/${_case.id}/pip/preliminary-decision`
    },
    _case: _case
	};
	res.render('app/case/pip/decision/preliminary/reading-signs', pageObject);
});

router.post('/app/cases/:id/pip/decision/preliminary/reading-signs', (req, res) => {

	checkAndContinue(req, res, {
		preparingFood: false,
		takingNutrition: false,
		managingTherapy: false,
		washingAndBathing: false,
		managingToilet: false,
		dressingAndUndressing: false,
		communicatingVerbally: false,
    readingAndUnderstanding: false,
    engagingFace: true,
		makingDecisions: true,
		// MOBILITY
		planningJourneys: true,
    movingAround: true
	});

});


// 9. PRELIMINARY: Engaging with other people face to face
router.get('/app/cases/:id/pip/decision/preliminary/engaging-face', (req, res) => {
	var _case = helpers.getCase(req.session.cases, req.params.id);
	var pageObject = {
		casebar: helpers.getCaseBarObject(_case),
		caseActions: helpers.getCaseActions(_case),
    backLink: {
      href: `/app/cases/${_case.id}/pip/preliminary-decision`
    },
    _case: _case
	};
	res.render('app/case/pip/decision/preliminary/engaging-face', pageObject);
});

router.post('/app/cases/:id/pip/decision/preliminary/engaging-face', (req, res) => {

	checkAndContinue(req, res, {
		preparingFood: false,
		takingNutrition: false,
		managingTherapy: false,
		washingAndBathing: false,
		managingToilet: false,
		dressingAndUndressing: false,
		communicatingVerbally: false,
		readingAndUnderstanding: false,
    engagingFace: false,
    makingDecisions: true,
		// MOBILITY
		planningJourneys: true,
    movingAround: true
	});

});


// 10. PRELIMINARY: Making budgeting decision
router.get('/app/cases/:id/pip/decision/preliminary/budgeting-decision', (req, res) => {
	var _case = helpers.getCase(req.session.cases, req.params.id);
	var pageObject = {
		casebar: helpers.getCaseBarObject(_case),
		caseActions: helpers.getCaseActions(_case),
    backLink: {
      href: `/app/cases/${_case.id}/pip/preliminary-decision`
    },
    _case: _case
	};
	res.render('app/case/pip/decision/preliminary/budgeting-decision', pageObject);
});

router.post('/app/cases/:id/pip/decision/preliminary/budgeting-decision', (req, res) => {

	checkAndContinue(req, res, {
		preparingFood: false,
		takingNutrition: false,
		managingTherapy: false,
		washingAndBathing: false,
		managingToilet: false,
		dressingAndUndressing: false,
		communicatingVerbally: false,
    readingAndUnderstanding: false,
    engagingFace: false,
		makingDecisions: false,
		// MOBILITY
		planningJourneys: true,
    movingAround: true
	});

});


// 1. PRELIMINARY: Planning and following journeys
router.get('/app/cases/:id/pip/decision/preliminary/planning-journeys', (req, res) => {
	var _case = helpers.getCase(req.session.cases, req.params.id);
	var pageObject = {
		casebar: helpers.getCaseBarObject(_case),
		caseActions: helpers.getCaseActions(_case),
    backLink: {
      href: `/app/cases/${_case.id}/pip/preliminary-decision`
    },
    _case: _case
	};
	res.render('app/case/pip/decision/preliminary/planning-journeys', pageObject);
});

router.post('/app/cases/:id/pip/decision/preliminary/planning-journeys', (req, res) => {

	checkAndContinue(req, res, {
		preparingFood: false,
		takingNutrition: false,
		managingTherapy: false,
		washingAndBathing: false,
		managingToilet: false,
		dressingAndUndressing: false,
		communicatingVerbally: false,
    readingAndUnderstanding: false,
    engagingFace: false,
		makingDecisions: false,
		// MOBILITY
		planningJourneys: false,
    movingAround: true
	});

});


// 2. PRELIMINARY: Moving around
router.get('/app/cases/:id/pip/decision/preliminary/moving-around', (req, res) => {
	var _case = helpers.getCase(req.session.cases, req.params.id);
	var pageObject = {
		casebar: helpers.getCaseBarObject(_case),
		caseActions: helpers.getCaseActions(_case),
    backLink: {
      href: `/app/cases/${_case.id}/pip/preliminary-decision`
    },
    _case: _case
	};
	res.render('app/case/pip/decision/preliminary/moving-around', pageObject);
});

router.post('/app/cases/:id/pip/decision/preliminary/moving-around', (req, res) => {

	checkAndContinue(req, res, {
		preparingFood: false,
		takingNutrition: false,
		managingTherapy: false,
		washingAndBathing: false,
		managingToilet: false,
		dressingAndUndressing: false,
		communicatingVerbally: false,
    readingAndUnderstanding: false,
    engagingFace: false,
		makingDecisions: false,
		// MOBILITY
		planningJourneys: false,
    movingAround: false
	});

});






// PRELIMINARY: Panel reasons
router.get('/app/cases/:id/pip/decision/preliminary/panel-reasons', (req, res) => {
  var _case = helpers.getCase(req.session.cases, req.params.id);
	var pageObject = {
		casebar: helpers.getCaseBarObject(_case),
		caseActions: helpers.getCaseActions(_case),
    backLink: {
      href: `/app/cases/${_case.id}/pip/preliminary-decision`
    },
    _case: _case
	};
	res.render('app/case/pip/decision/preliminary/panel-reasons', pageObject);
});

router.post('/app/cases/:id/pip/decision/preliminary/panel-reasons', (req, res) => {
	res.redirect(`/app/cases/${req.params.id}/pip/decision/preliminary/preview-decision`);
});


// PRELIMINARY: Preview decision
router.get('/app/cases/:id/pip/decision/preliminary/preview-decision', (req, res) => {
  var _case = helpers.getCase(req.session.cases, req.params.id);
	var pageObject = {
		casebar: helpers.getCaseBarObject(_case),
		caseActions: helpers.getCaseActions(_case),
    backLink: {
      href: `/app/cases/${_case.id}/pip/preliminary-decision`
    },
    _case: _case
	};
	res.render('app/case/pip/decision/preliminary/preview-decision', pageObject);
});

router.post('/app/case/:id/pip/decision/preliminary/preview-decision', (req, res) => {
	res.redirect(`/app/cases/${req.params.id}/pip/decision/preliminary/decision-submitted`);
});


// PRELIMINARY: Decision submitted
router.get('/app/cases/:id/pip/decision/preliminary/decision-submitted', (req, res) => {
  var _case = helpers.getCase(req.session.cases, req.params.id);
	var pageObject = {
		casebar: helpers.getCaseBarObject(_case),
		caseActions: helpers.getCaseActions(_case),
    backLink: {
      href: `/app/cases/${_case.id}/pip/preliminary-decision`
		},
		_case: _case
	};
	res.render('app/case/pip/decision/preliminary/decision-submitted', pageObject);
});



// FINAL: Decision
router.get('/app/cases/:id/pip/decision/final', (req, res) => {
  var _case = helpers.getCase(req.session.cases, req.params.id);
	var pageObject = {
		casebar: helpers.getCaseBarObject(_case),
		caseActions: helpers.getCaseActions(_case),
    backLink: {
      href: `/app/cases/${_case.id}/pip/decision`
    },
    _case: _case
	};
	res.render('app/case/pip/decision/final/index', pageObject);
});

router.post('/app/cases/:id/pip/decision/final', (req, res) => {

	var v = new Validator(req, res);
	v.add('decision-notes', [{
		fn: (value) => {
			return value.trim().length > 0;
		},
		message: 'Enter your decision notes'
	}]);

	if(v.validate()) {

    res.redirect(`/app/cases/${req.params.id}/pip/decision/final/check`);

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
		res.render('app/case/pip/decision/final/index', pageObject);
  }

});


// FINAL: Check
router.get('/app/cases/:id/pip/decision/final/check', (req, res) => {
	var _case = helpers.getCase(req.session.cases, req.params.id);
	var pageObject = {
		casebar: helpers.getCaseBarObject(_case),
		backLink: {
			href: `/app/cases/${_case.id}/pip/decision/final`
		},
		_case: _case
	};
	res.render('app/case/pip/decision/final/check', pageObject);
});

router.post('/app/cases/:id/pip/decision/final/submit', (req, res) => {
	res.redirect(`/app/cases/${req.params.id}/pip/decision/final/confirmation`);
});


// FINAL: Confirmation
router.get('/app/cases/:id/pip/decision/final/confirmation', (req, res) => {
	var _case = helpers.getCase(req.session.cases, req.params.id);
	var pageObject = {
		_case: _case
	};
	res.render('app/case/pip/decision/final/confirmation', pageObject);
});



// List for hearing
router.get('/app/cases/:id/pip/list-for-hearing', (req, res) => {
  var _case = helpers.getCase(req.session.cases, req.params.id);
	var pageObject = {
		casebar: helpers.getCaseBarObject(_case),
		caseActions: helpers.getCaseActions(_case),
    backLink: {
      href: `/app/cases/${_case.id}`
    },
    _case: _case
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
