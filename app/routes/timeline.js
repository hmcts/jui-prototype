var express = require('express');
var router  = express.Router();
var helpers = require('./helpers');

router.get('/app/cases/:id/timeline', (req, res) => {
	var _case = helpers.getCase(req.session.cases, req.params.id);
    var pageObject = {
      _case: _case,
      casebar: helpers.getCaseBarObject(_case),
      caseNavItems: helpers.getCaseNavItems(_case, 'timeline'),
      caseActions: helpers.getCaseActions(_case),
      events: helpers.getEvents(_case)
    };
    res.render('app/case/timeline/index', pageObject);
});

router.get('/app/cases/:id/timeline/:question_id', (req, res) => {
	var _case = helpers.getCase(req.session.cases, req.params.id);
	var pageObject = {
		_case: _case,
		casebar: helpers.getCaseBarObject(_case),
		caseNavItems: helpers.getCaseNavItems(_case, 'timeline'),
		caseActions: helpers.getCaseActions(_case),
		event: helpers.getEvents(_case).filter(event => event.id === req.params.question_id)[0]
	};
  res.render('app/case/timeline/show', pageObject);
});

module.exports = router;