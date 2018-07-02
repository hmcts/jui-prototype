var express = require('express');
var router  = express.Router();
var helpers = require('./helpers');

router.get('/app/cases/:id/divorce/make-decision', (req, res) => {
	var _case = helpers.getCase(req.session.cases, req.params.id);

	var pageObject = {
		casebar: helpers.getCaseBarObject(_case),
		caseActions: helpers.getCaseActions(_case)
	};

	res.render('app/case/divorce/decision/make-decision', pageObject);
});

router.post('/app/cases/:id/divorce/make-decision', (req, res) => {
	if (req.body.satisfied === 'no') {
		res.redirect('provide-reason');
	} else {
		res.redirect('costs-order');
	}
});

router.get('/app/cases/:id/divorce/provide-reason', (req, res) => {
	var _case = helpers.getCase(req.session.cases, req.params.id);
	var pageObject = {
		casebar: helpers.getCaseBarObject(_case),
		backLink: {
			href: `/app/cases/${_case.id}/make-decision`
		}
	};
	res.render('app/case/divorce/decision/provide-reason', pageObject);
});

router.post('/app/cases/:id/divorce/provide-reason', (req, res) => {
	res.redirect('generate-order');
});

router.get('/app/cases/:id/divorce/generate-order', (req, res) => {
	var _case = helpers.getCase(req.session.cases, req.params.id);
	var pageObject = {
		casebar: helpers.getCaseBarObject(_case)
	};
	res.render('app/case/divorce/decision/generate-order', pageObject);
});

router.post('/app/cases/:id/divorce/generate-order', (req, res) => {
	res.redirect('confirmation');
});

// Yes option route
router.get('/app/cases/:id/divorce/costs-order', (req, res) => {
  var _case = helpers.getCase(req.session.cases, req.params.id);

	var pageObject = {
		casebar: helpers.getCaseBarObject(_case),
		caseActions: helpers.getCaseActions(_case)
	};

	res.render('app/case/divorce/decision/costs-order', pageObject);
});

router.post('/app/cases/:id/divorce/costs-order', (req, res) => {
	res.redirect('confirmation');
});

router.get('/app/cases/:id/divorce/confirmation', (req, res) => {
	var pageObject = {
		casenav: helpers.getCaseNavObject(req.params.id)
	};
	res.render('app/case/divorce/decision/confirmation', pageObject);
});

// router.get('/app/cases/:id/check-your-answers', (req, res) => {
// 	var _case = helpers.getCase(req.session.cases, req.params.id);
// 	var pageObject = {
// 		casebar: helpers.getCaseBarObject(_case)
// 	};
// 	res.render('app/case/divorce/check-your-answers', pageObject);
// });

module.exports = router;