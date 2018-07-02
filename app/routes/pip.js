var express = require('express');
var router  = express.Router();
var helpers = require('./helpers');

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

function Validator(req) {
	this.req = req;
	this.validators = [];
	this.errors = [];
}

Validator.prototype.add = function(name, rules) {
	this.validators.push({
    name: name,
    rules: rules
  });
};

Validator.prototype.getErrors = function() {
	return this.errors;
};

Validator.prototype.getFormattedErrors = function() {
	return this.errors.map(this.formatError);
};

Validator.prototype.formatError = function(error) {
	return {
		text: error.message,
		href: '#' + error.name
	}
};

Validator.prototype.getError = function(name) {
	return this.getErrors().filter(error => error.name == name).map(this.formatError)[0];
};

Validator.prototype.validate = function() {
	this.errors = [];
  var validator = null,
    validatorValid = true,
    i,
    j;
  for (i = 0; i < this.validators.length; i++) {
    validator = this.validators[i];
    for (j = 0; j < validator.rules.length; j++) {
      validatorValid = validator.rules[j].fn(this.req.body[validator.name],
        validator.rules[j].params);
      if (!validatorValid) {
        this.errors.push({
          name: validator.name,
          message: validator.rules[j].message
        });
        break;
      }
    }
  }
  return this.errors.length === 0;
}

router.post('/app/cases/:id/pip/make-decision', (req, res) => {

	var v = new Validator(req);
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
			errors: v.getFormattedErrors(),
			decisionNotesError: v.getError('decision-notes')
		};
		res.render('app/case/pip/decision/decision', pageObject);
	}
});

router.get('/app/cases/:id/pip/check-decision', (req, res) => {
	var _case = helpers.getCase(req.session.cases, req.params.id);
	var pageObject = {
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

router.get('/app/cases/:id/pip/decision-confirmation', (req, res) => {
	var _case = helpers.getCase(req.session.cases, req.params.id);
	var pageObject = {
		_case: _case
	};
	res.render('app/case/pip/decision/confirmation', pageObject);
});

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

router.get('/app/cases/:id/pip/hearing-confirmation', (req, res) => {
	var _case = helpers.getCase(req.session.cases, req.params.id);
	var pageObject = {
		_case: _case
	};
	res.render('app/case/pip/list-for-hearing/confirmation', pageObject);
});


module.exports = router;