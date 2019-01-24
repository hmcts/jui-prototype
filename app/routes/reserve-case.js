var express = require('express');
var router  = express.Router();
var helpers = require('./helpers');
var uuid = require('uuid/v4');

router.get('/app/cases/:id/reserve', (req, res) => {
	var _case = helpers.getCase(req.session.cases, req.params.id);
	var pageObject = {
		_case: _case,
		casebar: helpers.getCaseBarObject(_case)
	};
  res.render('app/case/fr/reserve/index', pageObject);
});

router.get('/app/cases/:id/reserve/confirmation', (req, res) => {
	var _case = helpers.getCase(req.session.cases, req.params.id);
	var pageObject = {
		_case: _case,
		casebar: helpers.getCaseBarObject(_case)
	};
	res.render('app/case/fr/reserve/confirmation', pageObject);
});

module.exports = router;