var express = require('express')
var router = express.Router()
var helpers = require('./helpers')

router.get('/app/cases/:id/actions', (req, res) => {
  var _case = helpers.getCase(req.session.cases, req.params.id)

  var pageObject = {
    _case: _case,
    casebar: helpers.getCaseBarObject(_case),
    radioButtonOptions: helpers.getCaseActions(_case).map(action => {
      return {
        html: action.text,
        value: action.href
      }
    })
  };

  res.render('app/case/actions/index', pageObject);
})

router.post('/app/cases/:id/actions', (req, res) => {
  res.redirect(req.body.action);
})

module.exports = router