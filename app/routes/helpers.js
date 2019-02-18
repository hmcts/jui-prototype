var types = require('../data/types');
var moment = require('moment');


// Parties on casebar
function getPartiesLineCasebar(_case) {
	return _case.parties.map(function(party) {
		if(party.org) {
			return '<b>' + party.org + '</b>';
		} else {
			return '<b>' + party.firstName + ' ' + party.lastName + '</b>';
		}

	}).join(' and ');
}


// Parties on dashboard
function getPartiesLineDashboard(_case) {
	return _case.parties.map(function(party) {
		if(party.org) {
			return party.org + '<br>';
		} else {
			return party.firstName + ' ' + party.lastName + '<br>';
		}

	}).join(' and ');
}


// Parties on summary
function getPartiesLineSummary(_case) {
	return _case.parties.map(function(party) {
		if(party.org) {
			return party.org;
		} else {
			return party.firstName + ' ' + party.lastName;
		}

	}).join(' v ');
}


function getAppellantName(_case) {
	return _case.parties.map(function(party) {
		if(party.firstName) {
			return party.firstName + ' ' + party.lastName;
		}
	})[0];
}


function getPetitionerName(_case) {
	return _case.parties.map(function(party) {
		if(party.firstName) {
			return party.firstName + ' ' + party.lastName;
		}
	})[0];
}


function getCaseType(_case) {
	var caseType = '';
	Object.keys(types).forEach(function(key) {
		if(types[key].id == _case.typeId) {
			caseType = types[key].id;
		}
	});
	return caseType;
}

function getCaseTypeLabel(_case) {
	var caseType = '';
	Object.keys(types).forEach(function(key) {
		if(types[key].id == _case.typeId) {
			caseType = types[key].label;
		}
	});
	return caseType;
}

function getCaseActions(_case) {
	switch(_case.typeId) {
		case 'pip':
			return [{
				items: [{
					href: `/app/cases/${_case.id}/pip/decision`,
					text: 'Send view or decision'
				},
				{
					href: `/app/cases/${_case.id}/pip/list-for-hearing`,
					text: 'List for hearing',
					classes: 'hmcts-button--secondary'
				}]
			}, {
				items: [{
					text: 'Reassign',
					href: `/app/cases/${_case.id}/reassign`,
					classes: 'hmcts-button--secondary'
				},
				{
					text: 'Refer',
					href: `/app/cases/${_case.id}/refer`,
					classes: 'hmcts-button--secondary'
				},
				{
					text: 'Reserve',
					href: `/app/cases/${_case.id}/reserve`,
					classes: 'hmcts-button--secondary'
				}]
			}]
		case 'fr':
			return [{
				items: [{
					text: 'Make a decision',
					href: `/app/cases/${_case.id}/fr/decision`
				}]
			}, {
				items: [{
					text: 'Reassign',
					href: `/app/cases/${_case.id}/reassign`,
					classes: 'hmcts-button--secondary'
				},
				{
					text: 'Refer',
					href: `/app/cases/${_case.id}/refer`,
					classes: 'hmcts-button--secondary'
				},
				{
					text: 'Reserve',
					href: `/app/cases/${_case.id}/reserve`,
					classes: 'hmcts-button--secondary'
				}]
			}]

		case 'divorce':
			return [{
				items: [{
					href: `/app/cases/${_case.id}/divorce/decision`,
					text: 'Make decision'
				}]
			}, {
				items: [{
					href: `/app/cases/${_case.id}/reassign`,
					text: 'Reassign',
					classes: 'hmcts-button--secondary'
				},
				{
					text: 'Refer',
					href: `/app/cases/${_case.id}/refer`,
					classes: 'hmcts-button--secondary'
				},
				{
					text: 'Reserve',
					href: `/app/cases/${_case.id}/reserve`,
					classes: 'hmcts-button--secondary'
				}]
			}]
	}
}

function getCaseNavItems(_case, id) {
	switch(_case.typeId) {
		case 'pip':
			return [
				{
					href: `/app/cases/${_case.id}/pip`,
					text: 'Summary',
					active: id === 'summary'
				},
				{
					href: `/app/cases/${_case.id}/documents`,
					text: 'Case file',
					active: id === 'casefile'
				},
				{
					href: `/app/cases/${_case.id}/pip/timeline`,
					text: 'Timeline',
					active: id === 'timeline'
				},
				{
					href: `/app/cases/${_case.id}/questions`,
					text: 'Questions',
					active: id === 'questions'
				},
				{
					href: `/app/cases/${_case.id}/linked-cases`,
					text: 'Linked cases',
					active: id === 'linked-cases'
				}
			];
		case 'fr':
			return [
				{
					href: `/app/cases/${_case.id}/fr`,
					text: 'Summary',
					active: id === 'summary'
        },
        {
					href: `/app/cases/${_case.id}/fr/parties`,
					text: 'Parties',
					active: id === 'parties'
				},
				{
					href: `/app/cases/${_case.id}/documents`,
					text: 'Case file',
					active: id === 'casefile'
				},
				{
					href: `/app/cases/${_case.id}/fr/timeline`,
					text: 'Timeline',
					active: id === 'timeline'
				},
				{
					href: `/app/cases/${_case.id}/linked-cases`,
					text: 'Linked cases',
					active: id === 'linked-cases'
				}
			];
		case 'divorce':
			return [
				{
					href: `/app/cases/${_case.id}/divorce`,
					text: 'Summary',
					active: id === 'summary'
				},
				{
					href: `/app/cases/${_case.id}/divorce/parties`,
					text: 'Parties',
					active: id === 'parties'
				},
				{
					href: `/app/cases/${_case.id}/documents`,
					text: 'Case file',
					active: id === 'casefile'
				},
				{
					href: `/app/cases/${_case.id}/divorce/timeline`,
					text: 'Timeline',
					active: id === 'timeline'
				},
				{
					href: `/app/cases/${_case.id}/linked-cases`,
					text: 'Linked cases',
					active: id === 'linked-cases'
				}
			];
	}
}



function getCaseBarObject(_case) {
	return {
		parties: getPartiesLineCasebar(_case)
	};
}

function getCase(cases, caseId) {
	return cases.filter(c => c.id == caseId)[0];
}

function getQuestion(_case, questionId) {
	var q = null;

	for(let round of _case.rounds) {
		for(let question of round.questions) {
			if(question.id === questionId) {
				q = question;
				break;
			}
		}
	}
	return q;
}

function getLinkedCase(_case, linkedCaseId) {
	var lc = null;

	for(let linkedCase of _case.linkedCases) {
		if(linkedCase.id === linkedCaseId) {
			lc = linkedCase;
			break;
		}
	}

	return lc;
}

function isDraftQuestion(_case, questionId) {
	var isDraft = false;
	for(let round of _case.rounds) {
		for(let question of round.questions) {
			if(question.id === questionId && !round.dateSent) {
				isDraft = true;
				break;
			}
		}
	}
	return isDraft;
}

function removeQuestion(_case, question) {
	for(let round of _case.rounds) {
		removeItemFromArray(round.questions, question);
	}
}

function removeLinkedCase(_case, linkedCase) {
	removeItemFromArray(_case.linkedCases, linkedCase);
}

function removeItemFromArray(array, element) {
	const index = array.indexOf(element);
	if (index !== -1) {
		array.splice(index, 1);
	}
}

function getFormattedDate(m) {
	var date = moment(m);
	var format = date.format('D MMMM YYYY');
	return format;
}

function getFormattedShortDate(m) {
	var date = moment(m);
	return date.format('D MMM YYYY');
}

function getFormattedShortDateDay(m) {
	var date = moment(m);
	return date.format('ddd D MMM YYYY');
}

function getFormattedTime(m) {
	var date = moment(m);
	return date.minutes() > 0 ? date.format('h:mma') : date.format('ha');
}

function getRecentEvents(_case) {
	return getEvents(_case).slice(0,3);
}

function getEvents(_case) {
	var events = [];

	var caseEvents = _case.events.slice();

	if(caseEvents) {
		events = caseEvents.map(originalEvent => {
			var o = Object.create(originalEvent);
			o.dateUtc = originalEvent.date;
			o.date = getFormattedShortDateDay(originalEvent.date);
			o.time = getFormattedTime(originalEvent.date);
			o.href = `/app/cases/${_case.id}/timeline/${o.id}`;
			return o;
		});

		// console.log(caseEvents);

		// events = events.sort((a, b) => {
		// 	if(a.date < b.date) {
		// 		return -1;
		// 	}
		// 	if(a.date > b.date) {
		// 		return 1;
		// 	}
		// 	return 0;
		// });
		events = events.reverse();
	}

	return events;
}

function getLinkedCases(_case) {
	return _case.linkedCases;
}

exports.getCaseBarObject = getCaseBarObject;

exports.getPartiesLineCasebar = getPartiesLineCasebar;
exports.getPartiesLineDashboard = getPartiesLineDashboard;
exports.getPartiesLineSummary = getPartiesLineSummary;

exports.getCase = getCase;
exports.getCaseType = getCaseType;
exports.getCaseTypeLabel = getCaseTypeLabel;
exports.getCaseActions = getCaseActions;
exports.getQuestion = getQuestion;
exports.isDraftQuestion = isDraftQuestion;
exports.removeQuestion = removeQuestion;
exports.removeItemFromArray = removeItemFromArray;
exports.getAppellantName = getAppellantName;
exports.getPetitionerName = getPetitionerName;
exports.getFormattedDate = getFormattedDate;
exports.getFormattedShortDate = getFormattedShortDate;
exports.getFormattedTime = getFormattedTime;
exports.getRecentEvents = getRecentEvents;
exports.getEvents = getEvents;
exports.getCaseNavItems = getCaseNavItems;
exports.getLinkedCases = getLinkedCases;
exports.getLinkedCase = getLinkedCase;
exports.removeLinkedCase = removeLinkedCase;