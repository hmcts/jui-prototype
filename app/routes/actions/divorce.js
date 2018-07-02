var helpers = require('../helpers');

function showCaseSummary(req, res) {

	var _case = helpers.getCase(req.session.cases, req.params.id);

	var pageObject = {
		casebar: helpers.getCaseBarObject(_case),
		caseActions: helpers.getCaseActions(_case),
		casenav: helpers.getCaseNavObject(_case),
		detailsRows: [],
		representativesRows: [],
		recentEvents: helpers.getRecentEvents(_case)
	};

	// Case details
	pageObject.detailsRows.push([{ html: 'Case number' },	{ html: _case.id + (_case.urgent ? ' <span class="jui-status  jui-status--urgent  govuk-!-margin-left-1">Urgent</span> ' : '') }]);
	pageObject.detailsRows.push([{ html: 'Case type' },	{ html: helpers.getCaseTypeLabel(_case) }]);
	pageObject.detailsRows.push([{ html: 'Case status' },	{ html: _case.status }]);
	pageObject.detailsRows.push([{ html: 'Reason for divorce' }, { html: _case.reason }]);


	// Representatives
	pageObject.representativesRows.push([{ html: 'Petitioner' }, { html: _case.petitioner ? _case.petitioner : 'Unrepresented' }]);
	pageObject.representativesRows.push([{ html: 'Respondent' }, { html: _case.respondent ? _case.respondent : 'Unrepresented' }]);

	res.render('app/case/divorce/summary', pageObject);

}

function viewParties(req, res) {

	var _case = helpers.getCase(req.session.cases, req.params.id);

	var pageObject = {
		casebar: helpers.getCaseBarObject(_case),
		caseActions: helpers.getCaseActions(_case),
		casenav: helpers.getCaseNavObject(_case)
	};

	res.render('app/case/divorce/parties', pageObject);

}

exports.showCaseSummary = showCaseSummary;
exports.viewParties = viewParties;