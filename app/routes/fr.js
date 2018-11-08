var express = require('express');
var router  = express.Router();
var helpers = require('./helpers');
var Validator = require('./validator');


// Is checked
function isChecked(req, name, value) {
	return req.session.data[name].indexOf(value) >= 0;
}


// Summary
router.route('/app/cases/:id/fr')

  .get((req, res) => {
    var _case = helpers.getCase(req.session.cases, req.params.id);
    var pageObject = {
      _case: _case,
      success: req.session.success,
      casebar: helpers.getCaseBarObject(_case),
      caseNavItems: helpers.getCaseNavItems(_case, 'summary'),
      detailsRows: [],
      panelRows: [],
      recentEvents: helpers.getRecentEvents(_case)
    };

    // Case details
    pageObject.detailsRows.push([{ html: 'Parties' }, {html: helpers.getPartiesLineSummary(_case)}]);
    pageObject.detailsRows.push([{ html: 'Case number' }, {html: _case.id}]);
    pageObject.detailsRows.push([{ html: 'Case type' }, {html: helpers.getCaseTypeLabel(_case)}]);
    pageObject.detailsRows.push([{ html: 'Decree nisi granted' }, {html: helpers.getFormattedDate(_case.decreeDate)}]);
    pageObject.linkedCaseRows = [];
    _case.linkedCases.forEach((item) => {
      pageObject.detailsRows.push([{
        html: 'Full divorce case'
      }, {
        html: `<a href="/app/cases/${item.id}">${item.id}</a>`
      }]);
    });
    res.render('app/case/fr/summary', pageObject);
  });



// Timeline
router.route('/app/cases/:id/fr/timeline')

  .get((req, res) => {
    var _case = helpers.getCase(req.session.cases, req.params.id);
    var pageObject = {
      _case: _case,
      casebar: helpers.getCaseBarObject(_case),
      caseNavItems: helpers.getCaseNavItems(_case, 'timeline'),
      caseActions: helpers.getCaseActions(_case),
      events: helpers.getEvents(_case)
    };
    res.render('app/case/fr/timeline', pageObject);
  });



// Parties
router.get('/app/cases/:id/fr/parties', (req, res) => {
	var _case = helpers.getCase(req.session.cases, req.params.id);

	var pageObject = {
		casebar: helpers.getCaseBarObject(_case),
		caseActions: helpers.getCaseActions(_case),
		caseNavItems: helpers.getCaseNavItems(_case, 'parties'),
		_case: _case
	};

	pageObject.applicantRows = [];
	pageObject.respondentRows = [];

	if(_case.applicant) {
		_case.applicant.forEach((item) => {
			pageObject.applicantRows.push([{ html: 'Full name' }, { html: item.fullname }]);
			pageObject.applicantRows.push([{ html: 'Date of birth' }, { html: helpers.getFormattedDate(item.dateOfBirth) }]);
			pageObject.applicantRows.push([{ html: 'Address' }, { html: item.address }]);
			pageObject.applicantRows.push([{ html: 'Phone' }, { html: item.phone }]);
			pageObject.applicantRows.push([{ html: 'Email' }, { html: item.email }]);
			pageObject.applicantRows.push([{ html: 'Representative' }, { html: item.representative ? _case.representative : 'Unrepresented' }]);
		});
	}

	if(_case.respondent) {
		_case.respondent.forEach((item) => {
			pageObject.respondentRows.push([{ html: 'Full name' }, { html: item.fullname }]);
			pageObject.respondentRows.push([{ html: 'Date of birth' }, { html: helpers.getFormattedDate(item.dateOfBirth) }]);
			pageObject.respondentRows.push([{ html: 'Address' }, { html: item.address }]);
			pageObject.respondentRows.push([{ html: 'Phone' }, { html: item.phone }]);
			pageObject.respondentRows.push([{ html: 'Email' }, { html: item.email }]);
			pageObject.respondentRows.push([{ html: 'Representative' }, { html: item.representative ? _case.representative : 'Unrepresented' }]);
		});
	}

	res.render('app/case/fr/parties', pageObject);

});



// Consent orders
router.route('/app/cases/:id/fr/consent-orders')

  .get((req, res) => {
    var _case = helpers.getCase(req.session.cases, req.params.id);
    var pageObject = {
      _case: _case,
      casebar: helpers.getCaseBarObject(_case),
      caseActions: helpers.getCaseActions(_case),
      caseNavItems: helpers.getCaseNavItems(_case, 'consentorders')
    };
    res.render('app/case/fr/consent-orders', pageObject);
  });



// History
router.route('/app/cases/:id/fr/history')

  .get((req, res) => {
    var _case = helpers.getCase(req.session.cases, req.params.id);
    var pageObject = {
      _case: _case,
      casebar: helpers.getCaseBarObject(_case),
      caseActions: helpers.getCaseActions(_case),
      caseNavItems: helpers.getCaseNavItems(_case, 'casefile')
    };
    res.render('app/case/fr/history', pageObject);
  });



// Upload new item
router.route('/app/cases/:id/fr/upload-new-item')

  .get((req, res) => {
    var _case = helpers.getCase(req.session.cases, req.params.id);
    var pageObject = {
      _case: _case,
      casebar: helpers.getCaseBarObject(_case),
      caseActions: helpers.getCaseActions(_case)
    };
    res.render('app/case/fr/upload-new-item', pageObject);
  });



// Decision
router.route('/app/cases/:id/fr/decision')

  .get((req, res) => {
    var _case = helpers.getCase(req.session.cases, req.params.id);
    var pageObject = {
      casebar: helpers.getCaseBarObject(_case),
      caseActions: helpers.getCaseActions(_case),
      backLink: {
        href: `/app/cases/${_case.id}`
      }
    };
    res.render('app/case/fr/decision/decision', pageObject);
  })

  .post((req, res) => {

    var v = new Validator(req, res);

    v.add('decision', [{

      fn: (value) => {
        var valid = true;
        if(!value || value.trim().length ==  0) {
          valid = false;
        }
        return valid;
      },

      message: 'Select yes if you want to approve the draft consent order'

    }]);

    if(v.validate()) {

      // Approve
      if(req.body.decision === 'Consent order approved') {
        res.redirect(`/app/cases/${req.params.id}/fr/notes-for-court-administrator`);

      // Consent order not approved
      } else if(req.body.decision === 'Consent order not approved') {
        res.redirect(`/app/cases/${req.params.id}/fr/reject-reasons`);
      }

    } else {
      var _case = helpers.getCase(req.session.cases, req.params.id);
      var pageObject = {
        casebar: helpers.getCaseBarObject(_case),
        caseActions: helpers.getCaseActions(_case),
        backLink: {
          href: `/app/cases/${_case.id}`
        }
      };
      res.render('app/case/fr/decision/decision', pageObject);
    }

  });



// Upload 1
router.route('/app/cases/:id/fr/upload-1')

  .get((req, res) => {
    var _case = helpers.getCase(req.session.cases, req.params.id);
    var pageObject = {
      casebar: helpers.getCaseBarObject(_case),
      caseActions: helpers.getCaseActions(_case),
      backLink: {
        href: `/app/cases/${_case.id}/fr/decision`
      },
      _case: _case
    };
    res.render('app/case/fr/decision/upload-1', pageObject);
  })

  .post((req, res) => {
    if(req.body.uploadnew == 'Yes') {
      res.redirect(`/app/cases/${req.params.id}/fr/upload-2`);
    } else {
      switch(req.session.data.decision) {
        case 'Approve consent order':
        case 'Ask for more information':
          res.redirect(`/app/cases/${req.params.id}/fr/notes`);
          break;
        case 'Reject consent order':
          res.redirect(`/app/cases/${req.params.id}/fr/reject-reasons`);
          break;
      }
    }
  });



// Upload 2
router.route('/app/cases/:id/fr/upload-2')

  .get((req, res) => {
    var _case = helpers.getCase(req.session.cases, req.params.id);
    var pageObject = {
      casebar: helpers.getCaseBarObject(_case),
      caseActions: helpers.getCaseActions(_case),
      backLink: {
        href: `/app/cases/${_case.id}/fr/upload-1`
      },
      _case: _case
    };
    res.render('app/case/fr/decision/upload-2', pageObject);
  })

  .post((req, res) => {
    if(req.session.data.decision === 'Ask for more information') {
      res.redirect(`/app/cases/${req.params.id}/fr/notes`);
    } else {
      res.redirect(`/app/cases/${req.params.id}/fr/reject-reasons`);
    }
  });



// More information
router.route('/app/cases/:id/fr/more-information')

  .get((req, res) => {
    var _case = helpers.getCase(req.session.cases, req.params.id);
    var pageObject = {
      casebar: helpers.getCaseBarObject(_case),
      caseActions: helpers.getCaseActions(_case),
      backLink: {
        href: `/app/cases/${_case.id}/fr/decision`
      },
      _case: _case
    };
    res.render('app/case/fr/decision/more-information', pageObject);
  })

  .post((req, res) => {
    res.redirect(`/app/cases/${req.params.id}/fr/check`);
  });



// Hearing details
router.route('/app/cases/:id/fr/hearing-details')

  .get((req, res) => {
    var _case = helpers.getCase(req.session.cases, req.params.id);
    var pageObject = {
      casebar: helpers.getCaseBarObject(_case),
      caseActions: helpers.getCaseActions(_case),
      backLink: {
        href: `/app/cases/${_case.id}/fr/decision`
      },
      _case: _case
    };
    res.render('app/case/fr/decision/hearing-details', pageObject);
  })

  .post((req, res) => {
    res.redirect(`/app/cases/${req.params.id}/fr/notes-for-court-administrator`);
  });



// Draft consent order
router.route('/app/cases/:id/fr/draft-consent-order')

  .get((req, res) => {
    var _case = helpers.getCase(req.session.cases, req.params.id);
    var pageObject = {
      casebar: helpers.getCaseBarObject(_case),
      caseActions: helpers.getCaseActions(_case),
      backLink: {
        href: `/app/cases/${_case.id}/fr/decision`
      }
    };
    res.render('app/case/fr/decision/draft-consent-order', pageObject);
  })

  .post((req, res) => {
    if(isChecked(req, 'reject', 'The parties need to attend a hearing')) {
      res.redirect(`/app/cases/${req.params.id}/fr/hearing-details`);
    } else {
      res.redirect(`/app/cases/${req.params.id}/fr/notes-for-court-administrator`);
    }
  });



// Notes for court administrator
router.route('/app/cases/:id/fr/notes-for-court-administrator')

  .get((req, res) => {
    var _case = helpers.getCase(req.session.cases, req.params.id);
    var pageObject = {
      casebar: helpers.getCaseBarObject(_case),
      caseActions: helpers.getCaseActions(_case),
      backLink: {
        href: `/app/cases/${_case.id}/fr/draft-consent-order`
      }
    };
    res.render('app/case/fr/decision/notes-for-court-administrator', pageObject);
  })

  .post((req, res) => {
    res.redirect(`/app/cases/${req.params.id}/fr/check`);
  });



// Reject reasons
router.route('/app/cases/:id/fr/reject-reasons')

  .get((req, res) => {
    var _case = helpers.getCase(req.session.cases, req.params.id);
    var pageObject = {
      casebar: helpers.getCaseBarObject(_case),
      caseActions: helpers.getCaseActions(_case),
      backLink: {
        href: `/app/cases/${_case.id}`
      }
    };
    res.render('app/case/fr/decision/reject-reasons', pageObject);
  })

  .post((req, res) => {

    var v = new Validator(req, res);

    v.add('reject', [{

      fn: (value) => {
        var valid = true;
        if(value.indexOf(value) >= 0) {
          valid = false;
        }
        return valid;
      },

      message: 'Select reasons the consent order was not approved'

    }]);

    v.add('directions', [{

      fn: (value) => {
        var valid = true;
        if(!value || value.trim().length ==  0) {
          valid = false;
        }
        return valid;
      },

      message: 'Enter directions'

    }]);

    v.add('copyconsentorder', [{

      fn: (value) => {
        var valid = true;
        if(!value || value.trim().length ==  0) {
          valid = false;
        }
        return valid;
      },

      message: 'Select yes if you want to include an annotated version of the draft consent order'

    }]);

    if(v.validate()) {

      if(req.body.copyconsentorder === 'Yes') {

        res.redirect(`/app/cases/${req.params.id}/fr/draft-consent-order`);

      } else if (req.body.copyconsentorder === 'No') {

        if(isChecked(req, 'reject', 'The parties need to attend a hearing')) {
          res.redirect(`/app/cases/${req.params.id}/fr/hearing-details`);
        } else {
          res.redirect(`/app/cases/${req.params.id}/fr/notes-for-court-administrator`);
        }

      }

    } else {
      var _case = helpers.getCase(req.session.cases, req.params.id);
      var pageObject = {
        casebar: helpers.getCaseBarObject(_case),
        caseActions: helpers.getCaseActions(_case),
        backLink: {
          href: `/app/cases/${_case.id}`
        }
      };
      res.render('app/case/fr/decision/reject-reasons', pageObject);
    }


  });



// Reject reason
router.route('/app/cases/:id/fr/reject-reason')

  .get((req, res) => {
    var _case = helpers.getCase(req.session.cases, req.params.id);
    var pageObject = {
      casebar: helpers.getCaseBarObject(_case),
      caseActions: helpers.getCaseActions(_case),
      backLink: {
        href: `/app/cases/${_case.id}`
      }
    };
    res.render('app/case/fr/decision/reject-reason', pageObject);
  })

  .post((req, res) => {
    res.redirect(`/app/cases/${req.params.id}/fr/check`);
  });



// Reject reasons
router.route('/app/cases/:id/fr/reject-notes')

  .get((req, res) => {
    var _case = helpers.getCase(req.session.cases, req.params.id);
    var pageObject = {
      casebar: helpers.getCaseBarObject(_case),
      caseActions: helpers.getCaseActions(_case),
      backLink: {
        href: `/app/cases/${_case.id}`
      }
    };
    res.render('app/case/fr/decision/reject-notes', pageObject);
  })

  .post((req, res) => {
    res.redirect(`/app/cases/${req.params.id}/fr/check`);
  });



// Check answers
router.route('/app/cases/:id/fr/check')

  .get((req, res) => {
    var _case = helpers.getCase(req.session.cases, req.params.id);
    var pageObject = {
      casebar: helpers.getCaseBarObject(_case),
      caseActions: helpers.getCaseActions(_case),
      backLink: {
        href: `/app/cases/${_case.id}/fr/notes`
      },
      _case: _case,
      reasons: []
    };

    if(req.session.data.decision === 'List for hearing') {
      pageObject.backLink.href = `/app/cases/${_case.id}/fr/hearing-details`;
    }

    if(req.session.data.reject) {

      req.session.data.reject.forEach((item) => {
        if(item == 'Not enough information was supplied to decide if the order is fair') {

          // Loop through sub reasons and attach as sub reasons
          var r = {
            text: 'Not enough information was supplied to decide if the order is fair',
            sub: []
          };
          req.session.data.rejectsub.forEach((item) => {
            r.sub.push({
              text: item
            });
          });
          pageObject.reasons.push(r);
        } else if (item == 'Other') {

          // Grab other text input and add as reason
          pageObject.reasons.push({
            text: `Other: ${req.session.data.otherReason}`
          });
        } else {
          pageObject.reasons.push({
            text: item
          });
        }
      });
    }

    res.render('app/case/fr/decision/check', pageObject);

  });



// Submit decision
router.route('/app/cases/:id/fr/submit-decision')

  .post((req, res) => {
    res.redirect(`/app/cases/${req.params.id}/fr/decision-confirmation`);
  });



// Draft consent order
router.route('/app/cases/:id/fr/draft-consent-order')

  .get((req, res) => {
    var _case = helpers.getCase(req.session.cases, req.params.id);
    var pageObject = {
      casebar: helpers.getCaseBarObject(_case),
      caseActions: helpers.getCaseActions(_case),
      backLink: {
        href: `/app/cases/${_case.id}`
      }
    };
    res.render('app/case/fr/decision/draft-consent-order', pageObject);
  })

  .post( (req, res) => {
    if(isChecked(req, 'reject', 'The parties need to attend a hearing')) {
      res.redirect(`/app/cases/${req.params.id}/fr/hearing-details`);
    } else {
      res.redirect(`/app/cases/${req.params.id}/fr/check`);
    }
  });



// Decision confirmation
router.route('/app/cases/:id/fr/decision-confirmation')

  .get((req, res) => {
    var _case = helpers.getCase(req.session.cases, req.params.id);
    var pageObject = {
      _case: _case
    };
    res.render('app/case/fr/decision/confirmation', pageObject);
  });



module.exports = router;