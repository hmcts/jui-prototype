var express = require('express');
var router  = express.Router();
var helpers = require('./helpers');
var Validator = require('./validator');

function isChecked(req, name, value) {

  if (req.session.data[name]) {
    return req.session.data[name].indexOf(value) >= 0;
  }

}

function checkAndContinuePreliminary(req, res, config) {

  // 1. Preparing food
  if(config.preparingFood && isChecked(req, 'dailyliving', 'Preparing food')) {
    res.redirect(`/app/cases/${req.params.id}/pip/decision/preliminary-advanced/preparing-food`);

    // 2. Taking nutrition
    } else if (config.takingNutrition && isChecked(req, 'dailyliving', 'Taking nutrition')) {
      res.redirect(`/app/cases/${req.params.id}/pip/decision/preliminary-advanced/taking-nutrition`);

    // 3. Managing therapy or monitoring a health condition
    } else if (config.managingTherapy && isChecked(req, 'dailyliving', 'Managing therapy')) {
      res.redirect(`/app/cases/${req.params.id}/pip/decision/preliminary-advanced/managing-therapy`);

    // 4. Washing and bathing
    } else if (config.washingAndBathing && isChecked(req, 'dailyliving', 'Washing and bathing')) {
      res.redirect(`/app/cases/${req.params.id}/pip/decision/preliminary-advanced/washing-bathing`);

    // 5. Managing toilet needs or incontinence
    } else if (config.managingToilet && isChecked(req, 'dailyliving', 'Managing toilet')) {
      res.redirect(`/app/cases/${req.params.id}/pip/decision/preliminary-advanced/managing-toilet`);

    // 6. Dressing and undressing
    } else if (config.dressingAndUndressing && isChecked(req, 'dailyliving', 'Dressing and undressing')) {
      res.redirect(`/app/cases/${req.params.id}/pip/decision/preliminary-advanced/dressing-undressing`);

    // 7. Communicating verbally
    } else if (config.communicatingVerbally && isChecked(req, 'dailyliving', 'Communicating verbally')) {
      res.redirect(`/app/cases/${req.params.id}/pip/decision/preliminary-advanced/communicating-verbally`);

    // 8. Reading and understanding signs, symbols and words
    } else if (config.readingAndUnderstanding && isChecked(req, 'dailyliving', 'Reading signs')) {
      res.redirect(`/app/cases/${req.params.id}/pip/decision/preliminary-advanced/reading-signs`);

    // 9. Engaging with other people face to face
    } else if (config.engagingFace && isChecked(req, 'dailyliving', 'Engaging face')) {
      res.redirect(`/app/cases/${req.params.id}/pip/decision/preliminary-advanced/engaging-face`);

    // 10. Making budgeting decision
    } else if (config.makingDecisions && isChecked(req, 'dailyliving', 'Making budgeting')) {
      res.redirect(`/app/cases/${req.params.id}/pip/decision/preliminary-advanced/budgeting-decisions`);

    // 1. Planning and following journeys
    } else if (config.planningJourneys && isChecked(req, 'mobility', 'Planning journeys')) {
      res.redirect(`/app/cases/${req.params.id}/pip/decision/preliminary-advanced/planning-journeys`);

    // 2. Moving around
    } else if (config.movingAround && isChecked(req, 'mobility', 'Moving around')) {
      res.redirect(`/app/cases/${req.params.id}/pip/decision/preliminary-advanced/moving-around`);

      // Redirect
    } else {
      res.redirect(`/app/cases/${req.params.id}/pip/decision/preliminary-advanced/panel-reasons`);
  }

}

function checkAndContinueFinal(req, res, config) {

  // 1. Preparing food
  if(config.preparingFood && isChecked(req, 'dailyliving', 'Preparing food')) {
    res.redirect(`/app/cases/${req.params.id}/pip/decision/final-advanced/preparing-food`);

    // 2. Taking nutrition
    } else if (config.takingNutrition && isChecked(req, 'dailyliving', 'Taking nutrition')) {
      res.redirect(`/app/cases/${req.params.id}/pip/decision/final-advanced/taking-nutrition`);

    // 3. Managing therapy or monitoring a health condition
    } else if (config.managingTherapy && isChecked(req, 'dailyliving', 'Managing therapy')) {
      res.redirect(`/app/cases/${req.params.id}/pip/decision/final-advanced/managing-therapy`);

    // 4. Washing and bathing
    } else if (config.washingAndBathing && isChecked(req, 'dailyliving', 'Washing and bathing')) {
      res.redirect(`/app/cases/${req.params.id}/pip/decision/final-advanced/washing-bathing`);

    // 5. Managing toilet needs or incontinence
    } else if (config.managingToilet && isChecked(req, 'dailyliving', 'Managing toilet')) {
      res.redirect(`/app/cases/${req.params.id}/pip/decision/final-advanced/managing-toilet`);

    // 6. Dressing and undressing
    } else if (config.dressingAndUndressing && isChecked(req, 'dailyliving', 'Dressing and undressing')) {
      res.redirect(`/app/cases/${req.params.id}/pip/decision/final-advanced/dressing-undressing`);

    // 7. Communicating verbally
    } else if (config.communicatingVerbally && isChecked(req, 'dailyliving', 'Communicating verbally')) {
      res.redirect(`/app/cases/${req.params.id}/pip/decision/final-advanced/communicating-verbally`);

    // 8. Reading and understanding signs, symbols and words
    } else if (config.readingAndUnderstanding && isChecked(req, 'dailyliving', 'Reading signs')) {
      res.redirect(`/app/cases/${req.params.id}/pip/decision/final-advanced/reading-signs`);

    // 9. Engaging with other people face to face
    } else if (config.engagingFace && isChecked(req, 'dailyliving', 'Engaging face')) {
      res.redirect(`/app/cases/${req.params.id}/pip/decision/final-advanced/engaging-face`);

    // 10. Making budgeting decision
    } else if (config.makingDecisions && isChecked(req, 'dailyliving', 'Making budgeting')) {
      res.redirect(`/app/cases/${req.params.id}/pip/decision/final-advanced/budgeting-decisions`);

    // 1. Planning and following journeys
    } else if (config.planningJourneys && isChecked(req, 'mobility', 'Planning journeys')) {
      res.redirect(`/app/cases/${req.params.id}/pip/decision/final-advanced/planning-journeys`);

    // 2. Moving around
    } else if (config.movingAround && isChecked(req, 'mobility', 'Moving around')) {
      res.redirect(`/app/cases/${req.params.id}/pip/decision/final-advanced/moving-around`);

      // Redirect
    } else {
      res.redirect(`/app/cases/${req.params.id}/pip/decision/final-advanced/panel-reasons`);
  }

}


// Summary
router.get('/app/cases/:id/pip', (req, res) => {
  var _case = helpers.getCase(req.session.cases, req.params.id);
	var pageObject = {
		_case: _case,
		success: req.session.success,
		casebar: helpers.getCaseBarObject(_case),
		caseActions: helpers.getCaseBarActions(_case),
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


// Filters
router.get('/app/cases/:id/pip/filters', (req, res) => {
	var _case = helpers.getCase(req.session.cases, req.params.id);
	var pageObject = {
		casebar: helpers.getCaseBarObject(_case),
		caseNavItems: helpers.getCaseNavItems(_case, 'timeline'),
		caseActions: helpers.getCaseBarActions(_case),
    events: helpers.getEvents(_case),
    _case: _case
	};
	res.render('app/case/pip/filters', pageObject);
});

// DECISION: What do you want to issue?
router.get('/app/cases/:id/pip/decision', (req, res) => {
	var _case = helpers.getCase(req.session.cases, req.params.id);
  var pageObject = {
		casebar: helpers.getCaseBarObject(_case),
		caseActions: helpers.getCaseBarActions(_case),
		backLink: {
			href: `/app/cases/${_case.id}`
		},
		_case: _case
	};
	res.render('app/case/pip/decision/index', pageObject);
});

router.post('/app/cases/:id/pip/decision', (req, res) => {

  if(req.body.whatissue === 'Preliminary view') {

    // if(req.params.id == 'SC1231612324') {
      res.redirect(`/app/cases/${req.params.id}/pip/decision/preliminary-advanced`);
    // } else {
      // res.redirect(`/app/cases/${req.params.id}/pip/decision/preliminary`);
    // }

	} else {

    res.redirect(`/app/cases/${req.params.id}/pip/decision/final-advanced`);

  }

});

//////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////
// Simple final
//////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////

// FINAL: Decision
router.get('/app/cases/:id/pip/decision/final', (req, res) => {
  var _case = helpers.getCase(req.session.cases, req.params.id);
	var pageObject = {
		casebar: helpers.getCaseBarObject(_case),
		caseActions: helpers.getCaseBarActions(_case),
    backLink: {
      href: `/app/cases/${_case.id}/pip/decision`
    },
    _case: _case
	};
	res.render('app/case/pip/decision/final/index', pageObject);
});

router.post('/app/cases/:id/pip/decision/final', (req, res) => {

	var v = new Validator(req, res);
	v.add('final-decision-notes', [{
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
			caseActions: helpers.getCaseBarActions(_case),
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

//////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////
// Simple preliminary
//////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////

// PRELIMINARY: Preliminary view
router.get('/app/cases/:id/pip/decision/preliminary', (req, res) => {
	var _case = helpers.getCase(req.session.cases, req.params.id);
	var pageObject = {
		casebar: helpers.getCaseBarObject(_case),
		caseActions: helpers.getCaseBarActions(_case),
		_case: _case
	};
	res.render('app/case/pip/decision/preliminary/index', pageObject);
});

router.post('/app/cases/:id/pip/decision/preliminary', (req, res) => {
  res.redirect(`/app/cases/${req.params.id}/pip/decision/preliminary/check`);
});

// PRELIMINARY: Check
router.get('/app/cases/:id/pip/decision/preliminary/check', (req, res) => {
	var _case = helpers.getCase(req.session.cases, req.params.id);
	var pageObject = {
		casebar: helpers.getCaseBarObject(_case),
		_case: _case
	};
	res.render('app/case/pip/decision/preliminary/check', pageObject);
});

router.post('/app/cases/:id/pip/decision/preliminary/submit', (req, res) => {
	res.redirect(`/app/cases/${req.params.id}/pip/decision/preliminary/confirmation`);
});

// PRELIMINARY: Confirmation
router.get('/app/cases/:id/pip/decision/preliminary/confirmation', (req, res) => {
	var _case = helpers.getCase(req.session.cases, req.params.id);
	var pageObject = {
		_case: _case
	};
	res.render('app/case/pip/decision/preliminary/confirmation', pageObject);
});


// PRELIMINARY: Confirmation (advanced)
router.get('/app/cases/:id/pip/decision/preliminary-advanced/confirmation', (req, res) => {
	var _case = helpers.getCase(req.session.cases, req.params.id);
	var pageObject = {
		_case: _case
	};
	res.render('app/case/pip/decision/preliminary-advanced/confirmation', pageObject);
});

//////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////
// List for hearing
//////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////

// List for hearing
router.get('/app/cases/:id/pip/list-for-hearing', (req, res) => {
  var _case = helpers.getCase(req.session.cases, req.params.id);
	var pageObject = {
		casebar: helpers.getCaseBarObject(_case),
		caseActions: helpers.getCaseBarActions(_case),
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
		caseActions: helpers.getCaseBarActions(_case),
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


//////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////
// Preliminary advanced
//////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////

// PRELIMINARY: Preliminary view (advanced)
router.get('/app/cases/:id/pip/decision/preliminary-advanced', (req, res) => {
	var _case = helpers.getCase(req.session.cases, req.params.id);
	var pageObject = {
		casebar: helpers.getCaseBarObject(_case),
		caseActions: helpers.getCaseBarActions(_case),
		_case: _case
	};
	res.render('app/case/pip/decision/preliminary-advanced/index', pageObject);
});

router.post('/app/cases/:id/pip/decision/preliminary-advanced', (req, res) => {

  if(req.body.awardliving === 'No award' && req.body.awardmobility === 'No award') {
		res.redirect(`/app/cases/${req.params.id}/pip/decision/preliminary-advanced/scores`);
	} else {
		res.redirect(`/app/cases/${req.params.id}/pip/decision/preliminary-advanced/set-award-dates`);
  }

});





// PRELIMINARY: Set award dates
router.get('/app/cases/:id/pip/decision/preliminary-advanced/set-award-dates', (req, res) => {
	var _case = helpers.getCase(req.session.cases, req.params.id);
	var pageObject = {
		casebar: helpers.getCaseBarObject(_case),
		caseActions: helpers.getCaseBarActions(_case),
		_case: _case
	};
	res.render('app/case/pip/decision/preliminary-advanced/set-award-dates', pageObject);
});

router.post('/app/cases/:id/pip/decision/preliminary-advanced/set-award-dates', (req, res) => {
	res.redirect(`/app/cases/${req.params.id}/pip/decision/preliminary-advanced/scores`);
});


// PRELIMINARY: Scores
router.get('/app/cases/:id/pip/decision/preliminary-advanced/scores', (req, res) => {
	var _case = helpers.getCase(req.session.cases, req.params.id);
	var pageObject = {
		casebar: helpers.getCaseBarObject(_case),
		caseActions: helpers.getCaseBarActions(_case),
		_case: _case
	};
	res.render('app/case/pip/decision/preliminary-advanced/scores', pageObject);
});

router.post('/app/cases/:id/pip/decision/preliminary-advanced/scores', (req, res) => {

  checkAndContinuePreliminary(req, res, {

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
router.get('/app/cases/:id/pip/decision/preliminary-advanced/preparing-food', (req, res) => {
	var _case = helpers.getCase(req.session.cases, req.params.id);
	var pageObject = {
		casebar: helpers.getCaseBarObject(_case),
		caseActions: helpers.getCaseBarActions(_case),
    _case: _case
	};
  res.render('app/case/pip/decision/preliminary-advanced/preparing-food', pageObject);
});

router.post('/app/cases/:id/pip/decision/preliminary-advanced/preparing-food', (req, res) => {

  checkAndContinuePreliminary(req, res, {
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
router.get('/app/cases/:id/pip/decision/preliminary-advanced/taking-nutrition', (req, res) => {
	var _case = helpers.getCase(req.session.cases, req.params.id);
	var pageObject = {
		casebar: helpers.getCaseBarObject(_case),
		caseActions: helpers.getCaseBarActions(_case),
    _case: _case
	};
	res.render('app/case/pip/decision/preliminary-advanced/taking-nutrition', pageObject);
});

router.post('/app/cases/:id/pip/decision/preliminary-advanced/taking-nutrition', (req, res) => {

	checkAndContinuePreliminary(req, res, {
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
router.get('/app/cases/:id/pip/decision/preliminary-advanced/managing-therapy', (req, res) => {
	var _case = helpers.getCase(req.session.cases, req.params.id);
	var pageObject = {
		casebar: helpers.getCaseBarObject(_case),
		caseActions: helpers.getCaseBarActions(_case),
    _case: _case
	};
	res.render('app/case/pip/decision/preliminary-advanced/managing-therapy', pageObject);
});

router.post('/app/cases/:id/pip/decision/preliminary-advanced/managing-therapy', (req, res) => {

	checkAndContinuePreliminary(req, res, {
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
router.get('/app/cases/:id/pip/decision/preliminary-advanced/washing-bathing', (req, res) => {
	var _case = helpers.getCase(req.session.cases, req.params.id);
	var pageObject = {
		casebar: helpers.getCaseBarObject(_case),
		caseActions: helpers.getCaseBarActions(_case),
    _case: _case
	};
	res.render('app/case/pip/decision/preliminary-advanced/washing-bathing', pageObject);
});

router.post('/app/cases/:id/pip/decision/preliminary-advanced/washing-bathing', (req, res) => {

	checkAndContinuePreliminary(req, res, {
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
router.get('/app/cases/:id/pip/decision/preliminary-advanced/managing-toilet', (req, res) => {
	var _case = helpers.getCase(req.session.cases, req.params.id);
	var pageObject = {
		casebar: helpers.getCaseBarObject(_case),
		caseActions: helpers.getCaseBarActions(_case),
    _case: _case
	};
	res.render('app/case/pip/decision/preliminary-advanced/managing-toilet', pageObject);
});

router.post('/app/cases/:id/pip/decision/preliminary-advanced/managing-toilet', (req, res) => {

	checkAndContinuePreliminary(req, res, {
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
router.get('/app/cases/:id/pip/decision/preliminary-advanced/dressing-undressing', (req, res) => {
	var _case = helpers.getCase(req.session.cases, req.params.id);
	var pageObject = {
		casebar: helpers.getCaseBarObject(_case),
		caseActions: helpers.getCaseBarActions(_case),
    _case: _case
	};
	res.render('app/case/pip/decision/preliminary-advanced/dressing-undressing', pageObject);
});

router.post('/app/cases/:id/pip/decision/preliminary-advanced/dressing-undressing', (req, res) => {

	checkAndContinuePreliminary(req, res, {
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
router.get('/app/cases/:id/pip/decision/preliminary-advanced/communicating-verbally', (req, res) => {
	var _case = helpers.getCase(req.session.cases, req.params.id);
	var pageObject = {
		casebar: helpers.getCaseBarObject(_case),
		caseActions: helpers.getCaseBarActions(_case),
    _case: _case
	};
	res.render('app/case/pip/decision/preliminary-advanced/communicating-verbally', pageObject);
});

router.post('/app/cases/:id/pip/decision/preliminary-advanced/communicating-verbally', (req, res) => {

	checkAndContinuePreliminary(req, res, {
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
router.get('/app/cases/:id/pip/decision/preliminary-advanced/reading-signs', (req, res) => {
	var _case = helpers.getCase(req.session.cases, req.params.id);
	var pageObject = {
		casebar: helpers.getCaseBarObject(_case),
		caseActions: helpers.getCaseBarActions(_case),
    _case: _case
	};
	res.render('app/case/pip/decision/preliminary-advanced/reading-signs', pageObject);
});

router.post('/app/cases/:id/pip/decision/preliminary-advanced/reading-signs', (req, res) => {

	checkAndContinuePreliminary(req, res, {
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
router.get('/app/cases/:id/pip/decision/preliminary-advanced/engaging-face', (req, res) => {
	var _case = helpers.getCase(req.session.cases, req.params.id);
	var pageObject = {
		casebar: helpers.getCaseBarObject(_case),
		caseActions: helpers.getCaseBarActions(_case),
    _case: _case
	};
	res.render('app/case/pip/decision/preliminary-advanced/engaging-face', pageObject);
});

router.post('/app/cases/:id/pip/decision/preliminary-advanced/engaging-face', (req, res) => {

	checkAndContinuePreliminary(req, res, {
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
router.get('/app/cases/:id/pip/decision/preliminary-advanced/budgeting-decisions', (req, res) => {
	var _case = helpers.getCase(req.session.cases, req.params.id);
	var pageObject = {
		casebar: helpers.getCaseBarObject(_case),
		caseActions: helpers.getCaseBarActions(_case),
    _case: _case
	};
	res.render('app/case/pip/decision/preliminary-advanced/budgeting-decisions', pageObject);
});

router.post('/app/cases/:id/pip/decision/preliminary-advanced/budgeting-decisions', (req, res) => {

	checkAndContinuePreliminary(req, res, {
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
router.get('/app/cases/:id/pip/decision/preliminary-advanced/planning-journeys', (req, res) => {
	var _case = helpers.getCase(req.session.cases, req.params.id);
	var pageObject = {
		casebar: helpers.getCaseBarObject(_case),
		caseActions: helpers.getCaseBarActions(_case),
    _case: _case
	};
	res.render('app/case/pip/decision/preliminary-advanced/planning-journeys', pageObject);
});

router.post('/app/cases/:id/pip/decision/preliminary-advanced/planning-journeys', (req, res) => {

	checkAndContinuePreliminary(req, res, {
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
router.get('/app/cases/:id/pip/decision/preliminary-advanced/moving-around', (req, res) => {
	var _case = helpers.getCase(req.session.cases, req.params.id);
	var pageObject = {
		casebar: helpers.getCaseBarObject(_case),
		caseActions: helpers.getCaseBarActions(_case),
    _case: _case
	};
	res.render('app/case/pip/decision/preliminary-advanced/moving-around', pageObject);
});

router.post('/app/cases/:id/pip/decision/preliminary-advanced/moving-around', (req, res) => {

	checkAndContinuePreliminary(req, res, {
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
router.get('/app/cases/:id/pip/decision/preliminary-advanced/panel-reasons', (req, res) => {
  var _case = helpers.getCase(req.session.cases, req.params.id);
	var pageObject = {
		casebar: helpers.getCaseBarObject(_case),
		caseActions: helpers.getCaseBarActions(_case),
    _case: _case
	};
	res.render('app/case/pip/decision/preliminary-advanced/panel-reasons', pageObject);
});

router.post('/app/cases/:id/pip/decision/preliminary-advanced/panel-reasons', (req, res) => {
	res.redirect(`/app/cases/${req.params.id}/pip/decision/preliminary-advanced/preview-decision`);
});


// PRELIMINARY: Preview decision
router.get('/app/cases/:id/pip/decision/preliminary-advanced/preview-decision', (req, res) => {
  var _case = helpers.getCase(req.session.cases, req.params.id);
	var pageObject = {
		casebar: helpers.getCaseBarObject(_case),
		caseActions: helpers.getCaseBarActions(_case),
    _case: _case
	};
	res.render('app/case/pip/decision/preliminary-advanced/preview-decision', pageObject);
});

router.post('/app/cases/:id/pip/decision/preliminary-advanced/preview-decision', (req, res) => {
  res.redirect(`/app/cases/${req.params.id}/pip/decision/preliminary-advanced/decision-submitted`);
});

// PRELIMINARY: Decision submitted
router.get('/app/cases/:id/pip/decision/preliminary/decision-submitted', (req, res) => {
  var _case = helpers.getCase(req.session.cases, req.params.id);
	var pageObject = {
		casebar: helpers.getCaseBarObject(_case),
		caseActions: helpers.getCaseBarActions(_case),
		_case: _case
	};
	res.render('app/case/pip/decision/preliminary/decision-submitted', pageObject);
});


// PRELIMINARY: Decision submitted (advanced)
router.get('/app/cases/:id/pip/decision/preliminary-advanced/decision-submitted', (req, res) => {
  var _case = helpers.getCase(req.session.cases, req.params.id);
	var pageObject = {
		casebar: helpers.getCaseBarObject(_case),
		caseActions: helpers.getCaseBarActions(_case),
		_case: _case
	};
	res.render('app/case/pip/decision/preliminary-advanced/decision-submitted', pageObject);
});

// PRELIMINARY: Check (advanced)
router.get('/app/cases/:id/pip/decision/preliminary-advanced/check', (req, res) => {
	var _case = helpers.getCase(req.session.cases, req.params.id);
	var pageObject = {
		casebar: helpers.getCaseBarObject(_case),
		_case: _case
	};
	res.render('app/case/pip/decision/preliminary-advanced/check', pageObject);
});

router.post('/app/cases/:id/pip/decision/preliminary-advanced/submit', (req, res) => {
	res.redirect(`/app/cases/${req.params.id}/pip/decision/preliminary-advanced/confirmation`);
});









//////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////
// Final decision advanced routes
//////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////

// FINAL: index
router.get('/app/cases/:id/pip/decision/final-advanced', (req, res) => {
	var _case = helpers.getCase(req.session.cases, req.params.id);
	var pageObject = {
		casebar: helpers.getCaseBarObject(_case),
		caseActions: helpers.getCaseBarActions(_case),
		_case: _case
	};
	res.render('app/case/pip/decision/final-advanced/index', pageObject);
});

router.post('/app/cases/:id/pip/decision/final-advanced', (req, res) => {

  if(req.body.awardliving === 'No award' && req.body.awardmobility === 'No award') {
		res.redirect(`/app/cases/${req.params.id}/pip/decision/final-advanced/scores`);
	} else {
		res.redirect(`/app/cases/${req.params.id}/pip/decision/final-advanced/set-award-dates`);
  }

});


// FINAL: Set award dates
router.get('/app/cases/:id/pip/decision/final-advanced/set-award-dates', (req, res) => {
	var _case = helpers.getCase(req.session.cases, req.params.id);
	var pageObject = {
		casebar: helpers.getCaseBarObject(_case),
		caseActions: helpers.getCaseBarActions(_case),
		_case: _case
	};
	res.render('app/case/pip/decision/final-advanced/set-award-dates', pageObject);
});

router.post('/app/cases/:id/pip/decision/final-advanced/set-award-dates', (req, res) => {
	res.redirect(`/app/cases/${req.params.id}/pip/decision/final-advanced/scores`);
});


// FINAL: Scores
router.get('/app/cases/:id/pip/decision/final-advanced/scores', (req, res) => {
	var _case = helpers.getCase(req.session.cases, req.params.id);
	var pageObject = {
		casebar: helpers.getCaseBarObject(_case),
		caseActions: helpers.getCaseBarActions(_case),
		_case: _case
	};
	res.render('app/case/pip/decision/final-advanced/scores', pageObject);
});

router.post('/app/cases/:id/pip/decision/final-advanced/scores', (req, res) => {

  checkAndContinueFinal(req, res, {

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


// 1. FINAL: Preparing food
router.get('/app/cases/:id/pip/decision/final-advanced/preparing-food', (req, res) => {
	var _case = helpers.getCase(req.session.cases, req.params.id);
	var pageObject = {
		casebar: helpers.getCaseBarObject(_case),
		caseActions: helpers.getCaseBarActions(_case),
    _case: _case
	};
  res.render('app/case/pip/decision/final-advanced/preparing-food', pageObject);
});

router.post('/app/cases/:id/pip/decision/final-advanced/preparing-food', (req, res) => {

  checkAndContinueFinal(req, res, {
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


// 2. FINAL: Taking nutrition
router.get('/app/cases/:id/pip/decision/final-advanced/taking-nutrition', (req, res) => {
	var _case = helpers.getCase(req.session.cases, req.params.id);
	var pageObject = {
		casebar: helpers.getCaseBarObject(_case),
		caseActions: helpers.getCaseBarActions(_case),
    _case: _case
	};
	res.render('app/case/pip/decision/final-advanced/taking-nutrition', pageObject);
});

router.post('/app/cases/:id/pip/decision/final-advanced/taking-nutrition', (req, res) => {

	checkAndContinueFinal(req, res, {
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


// 3. FINAL: Managing therapy or monitoring a health condition
router.get('/app/cases/:id/pip/decision/final-advanced/managing-therapy', (req, res) => {
	var _case = helpers.getCase(req.session.cases, req.params.id);
	var pageObject = {
		casebar: helpers.getCaseBarObject(_case),
		caseActions: helpers.getCaseBarActions(_case),
    _case: _case
	};
	res.render('app/case/pip/decision/final-advanced/managing-therapy', pageObject);
});

router.post('/app/cases/:id/pip/decision/final-advanced/managing-therapy', (req, res) => {

	checkAndContinueFinal(req, res, {
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


// 4. FINAL: Washing and bathing
router.get('/app/cases/:id/pip/decision/final-advanced/washing-bathing', (req, res) => {
	var _case = helpers.getCase(req.session.cases, req.params.id);
	var pageObject = {
		casebar: helpers.getCaseBarObject(_case),
		caseActions: helpers.getCaseBarActions(_case),
    _case: _case
	};
	res.render('app/case/pip/decision/final-advanced/washing-bathing', pageObject);
});

router.post('/app/cases/:id/pip/decision/final-advanced/washing-bathing', (req, res) => {

	checkAndContinueFinal(req, res, {
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


// 5. FINAL: Managing toilet needs or incontinence
router.get('/app/cases/:id/pip/decision/final-advanced/managing-toilet', (req, res) => {
	var _case = helpers.getCase(req.session.cases, req.params.id);
	var pageObject = {
		casebar: helpers.getCaseBarObject(_case),
		caseActions: helpers.getCaseBarActions(_case),
    _case: _case
	};
	res.render('app/case/pip/decision/final-advanced/managing-toilet', pageObject);
});

router.post('/app/cases/:id/pip/decision/final-advanced/managing-toilet', (req, res) => {

	checkAndContinueFinal(req, res, {
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


// 6. FINAL: Dressing and undressing
router.get('/app/cases/:id/pip/decision/final-advanced/dressing-undressing', (req, res) => {
	var _case = helpers.getCase(req.session.cases, req.params.id);
	var pageObject = {
		casebar: helpers.getCaseBarObject(_case),
		caseActions: helpers.getCaseBarActions(_case),
    _case: _case
	};
	res.render('app/case/pip/decision/final-advanced/dressing-undressing', pageObject);
});

router.post('/app/cases/:id/pip/decision/final-advanced/dressing-undressing', (req, res) => {

	checkAndContinueFinal(req, res, {
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


// 7. FINAL: Communicating verbally
router.get('/app/cases/:id/pip/decision/final-advanced/communicating-verbally', (req, res) => {
	var _case = helpers.getCase(req.session.cases, req.params.id);
	var pageObject = {
		casebar: helpers.getCaseBarObject(_case),
		caseActions: helpers.getCaseBarActions(_case),
    _case: _case
	};
	res.render('app/case/pip/decision/final-advanced/communicating-verbally', pageObject);
});

router.post('/app/cases/:id/pip/decision/final-advanced/communicating-verbally', (req, res) => {

	checkAndContinueFinal(req, res, {
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


// 8. FINAL: Reading and understanding signs, symbols and words
router.get('/app/cases/:id/pip/decision/final-advanced/reading-signs', (req, res) => {
	var _case = helpers.getCase(req.session.cases, req.params.id);
	var pageObject = {
		casebar: helpers.getCaseBarObject(_case),
		caseActions: helpers.getCaseBarActions(_case),
    _case: _case
	};
	res.render('app/case/pip/decision/final-advanced/reading-signs', pageObject);
});

router.post('/app/cases/:id/pip/decision/final-advanced/reading-signs', (req, res) => {

	checkAndContinueFinal(req, res, {
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


// 9. FINAL: Engaging with other people face to face
router.get('/app/cases/:id/pip/decision/final-advanced/engaging-face', (req, res) => {
	var _case = helpers.getCase(req.session.cases, req.params.id);
	var pageObject = {
		casebar: helpers.getCaseBarObject(_case),
		caseActions: helpers.getCaseBarActions(_case),
    _case: _case
	};
	res.render('app/case/pip/decision/final-advanced/engaging-face', pageObject);
});

router.post('/app/cases/:id/pip/decision/final-advanced/engaging-face', (req, res) => {

	checkAndContinueFinal(req, res, {
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


// 10. FINAL: Making budgeting decision
router.get('/app/cases/:id/pip/decision/final-advanced/budgeting-decisions', (req, res) => {
	var _case = helpers.getCase(req.session.cases, req.params.id);
	var pageObject = {
		casebar: helpers.getCaseBarObject(_case),
		caseActions: helpers.getCaseBarActions(_case),
    _case: _case
	};
	res.render('app/case/pip/decision/final-advanced/budgeting-decisions', pageObject);
});

router.post('/app/cases/:id/pip/decision/final-advanced/budgeting-decisions', (req, res) => {

	checkAndContinueFinal(req, res, {
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


// 1. FINAL: Planning and following journeys
router.get('/app/cases/:id/pip/decision/final-advanced/planning-journeys', (req, res) => {
	var _case = helpers.getCase(req.session.cases, req.params.id);
	var pageObject = {
		casebar: helpers.getCaseBarObject(_case),
		caseActions: helpers.getCaseBarActions(_case),
    _case: _case
	};
	res.render('app/case/pip/decision/final-advanced/planning-journeys', pageObject);
});

router.post('/app/cases/:id/pip/decision/final-advanced/planning-journeys', (req, res) => {

	checkAndContinueFinal(req, res, {
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


// 2. FINAL: Moving around
router.get('/app/cases/:id/pip/decision/final-advanced/moving-around', (req, res) => {
	var _case = helpers.getCase(req.session.cases, req.params.id);
	var pageObject = {
		casebar: helpers.getCaseBarObject(_case),
		caseActions: helpers.getCaseBarActions(_case),
    _case: _case
	};
	res.render('app/case/pip/decision/final-advanced/moving-around', pageObject);
});

router.post('/app/cases/:id/pip/decision/final-advanced/moving-around', (req, res) => {

	checkAndContinueFinal(req, res, {
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


// FINAL: Panel reasons
router.get('/app/cases/:id/pip/decision/final-advanced/panel-reasons', (req, res) => {
  var _case = helpers.getCase(req.session.cases, req.params.id);
	var pageObject = {
		casebar: helpers.getCaseBarObject(_case),
		caseActions: helpers.getCaseBarActions(_case),
    _case: _case
	};
	res.render('app/case/pip/decision/final-advanced/panel-reasons', pageObject);
});

router.post('/app/cases/:id/pip/decision/final-advanced/panel-reasons', (req, res) => {
	res.redirect(`/app/cases/${req.params.id}/pip/decision/final-advanced/preview-decision`);
});


// FINAL: Preview decision
router.get('/app/cases/:id/pip/decision/final-advanced/preview-decision', (req, res) => {
  var _case = helpers.getCase(req.session.cases, req.params.id);
	var pageObject = {
		casebar: helpers.getCaseBarObject(_case),
		caseActions: helpers.getCaseBarActions(_case),
    _case: _case
	};
	res.render('app/case/pip/decision/final-advanced/preview-decision', pageObject);
});

router.post('/app/cases/:id/pip/decision/final-advanced/preview-decision', (req, res) => {
  res.redirect(`/app/cases/${req.params.id}/pip/decision/final-advanced/decision-submitted`);
});


// FINAL: Decision submitted
router.get('/app/cases/:id/pip/decision/preliminary/decision-submitted', (req, res) => {
  var _case = helpers.getCase(req.session.cases, req.params.id);
	var pageObject = {
		casebar: helpers.getCaseBarObject(_case),
		caseActions: helpers.getCaseBarActions(_case),
		_case: _case
	};
	res.render('app/case/pip/decision/preliminary/decision-submitted', pageObject);
});


// FINAL: Decision submitted (advanced)
router.get('/app/cases/:id/pip/decision/final-advanced/decision-submitted', (req, res) => {
  var _case = helpers.getCase(req.session.cases, req.params.id);
	var pageObject = {
		casebar: helpers.getCaseBarObject(_case),
		caseActions: helpers.getCaseBarActions(_case),
		_case: _case
	};
	res.render('app/case/pip/decision/final-advanced/decision-submitted', pageObject);
});

// FINAL: Check (advanced)
router.get('/app/cases/:id/pip/decision/final-advanced/check', (req, res) => {
	var _case = helpers.getCase(req.session.cases, req.params.id);
	var pageObject = {
		casebar: helpers.getCaseBarObject(_case),
		_case: _case
	};
	res.render('app/case/pip/decision/final-advanced/check', pageObject);
});

router.post('/app/cases/:id/pip/decision/final-advanced/submit', (req, res) => {
	res.redirect(`/app/cases/${req.params.id}/pip/decision/final-advanced/confirmation`);
});





module.exports = router;
