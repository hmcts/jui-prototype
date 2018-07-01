var helpers = require('../helpers');


function getCaseActions(_case) {
	return [
		{
			href: `/app/cases/${_case.id}/make-decision`,
			text: 'Make decision'
		},
		{
			href: `/app/cases/${_case.id}/list-for-hearing`,
			text: 'List for hearing'
		}
	];
}


function viewCaseSummary(req, res) {

	var _case = helpers.getCase(req.session.cases, req.params.id);

	var pageObject = {
		_case: _case,
		success: req.session.success,
		casebar: helpers.getCaseBarObject(_case),
		caseActions: getCaseActions(_case),
		casenav: helpers.getCaseNavObject(_case),
		detailsRows: [],
		panelRows: [],
		recentEvents: helpers.getRecentEvents(_case)
	};

	// Case details
	pageObject.detailsRows.push([{ html: 'Parties' }, {html: helpers.getPartiesLine(_case)}]);
	pageObject.detailsRows.push([{ html: 'Case number' }, {html: _case.id}]);
	pageObject.detailsRows.push([{ html: 'Case type' }, {html: helpers.getCaseTypeLabel(_case)}]);
	pageObject.detailsRows.push([{ html: 'Tribunal centre' }, {html: _case.tribunalCentre}]);
	pageObject.detailsRows.push([{ html: 'Additional requirements' }, {html: _case.requirements}]);

	res.render('app/case/pip/summary', pageObject);

}


function viewMakeDecision(req, res) {
	var _case = helpers.getCase(req.session.cases, req.params.id);

	var pageObject = {
		casebar: helpers.getCaseBarObject(_case),
		caseActions: getCaseActions(_case),
		decision: req.session.data['decision-notes']
	};

	res.render('app/case/pip/decision/make-decision', pageObject);
}

function saveDecision(req, res) {
	res.redirect(`/app/cases/${req.params.id}/check-decision`);
}

function checkDecision(req, res) {
	var _case = helpers.getCase(req.session.cases, req.params.id);
	var pageObject = {
		casebar: helpers.getCaseBarObject(_case),
		casenav: helpers.getCaseNavObject(_case),
		caseActions: helpers.getCaseActions(_case),
		backLink: {
			href: `/app/cases/${_case.id}/make-decision/`
		},
		decision: req.session.data['decision-notes'],
		_case: _case
	};

	res.render('app/case/pip/decision/check-decision', pageObject);
}

function submitDecision(req, res) {
	res.redirect(`/app/cases/${req.params.id}/decision-confirmation`);
}

function showDecisionConfirmation(req, res) {
	var _case = helpers.getCase(req.session.cases, req.params.id);
	var pageObject = {
		_case: _case
	};
	res.render('app/case/pip/decision/decision-confirmation', pageObject);
}

exports.viewCaseSummary = viewCaseSummary;
exports.viewMakeDecision = viewMakeDecision;
exports.saveDecision = saveDecision;
exports.checkDecision = checkDecision;
exports.submitDecision = submitDecision;
exports.showDecisionConfirmation = showDecisionConfirmation;