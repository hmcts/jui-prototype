var express = require('express');
var router  = express.Router();
var helpers = require('./helpers');
var Validator = require('./validator');
var moment = require('moment');
var uuid = require('uuid/v4');

router.get('/app/cases/:id/linked-cases', (req, res) => {
	var _case = helpers.getCase(req.session.cases, req.params.id);
	var pageObject = {
		_case: _case,
		casebar: helpers.getCaseBarObject(_case),
		caseNavItems: helpers.getCaseNavItems(_case, 'linked-cases'),
		caseActions: helpers.getCaseActions(_case),
		linkedCases: helpers.getLinkedCases(_case)
	};

	res.render('app/case/linked-cases/index', pageObject);

});

module.exports = router;