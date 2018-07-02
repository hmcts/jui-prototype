var express = require('express');
var router  = express.Router();
var helpers = require('./helpers');

router.get('/app/cases/:id/directions', (req, res) => {

	var _case = helpers.getCase(req.session.cases, req.params.id);

	var pageObject = {
		casebar: helpers.getCaseBarObject(_case),
		caseNavItems: helpers.getCaseNavItems(_case),
		createDirectionLink: {
			href: '/app/cases/' + req.params.id + '/directions/create-direction'
		},
		createDirectionOrderLink: {
			href: '/app/cases/' + req.params.id + '/directions/create-direction-order'
		}
	};

	res.render('app/case/directions/index', pageObject);

});

router.get('/app/cases/:id/directions/create-direction', (req, res) => {

	var _case = helpers.getCase(req.session.cases, req.params.id);

	var pageObject = {
		casebar: helpers.getCaseBarObject(_case),
		caseNavItems: helpers.getCaseNavItems(_case, 'directions'),
		caseId: _case.id
	};

	res.render('app/case/directions/create-direction', pageObject);
});

module.exports = router;