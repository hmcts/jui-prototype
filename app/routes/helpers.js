var types = require('../data/types');
var moment = require('moment');

function getPartiesLine(_case) {
	return _case.parties.map(function(party) {
		if(party.org) {
			return party.org;
		} else {
			return party.firstName + ' ' + party.lastName;
		}

	}).join(' versus ');
}

function getAppellantName(_case) {
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
		return [
			{
				href: `/app/cases/${_case.id}/pip/make-decision`,
				text: 'Make decision'
			},
			{
				href: `/app/cases/${_case.id}/pip/list-for-hearing`,
				text: 'List for hearing'
			}
		];
		case 'divorce':
			return [
				{
					href: `/app/cases/${_case.id}/divorce/make-decision`,
					text: 'Make decision'
				},
				{
					href: `/app/cases/${_case.id}/divorce/mark-as-prepared`,
					text: 'Mark as prepared'
				},
				{
					href: `/app/cases/${_case.id}/divorce/reassign`,
					text: 'Reassign'
				}
			];
	}
}

function getCaseNavItems(_case, id) {
	switch(_case.typeId) {
		case 'pip':
			return [
				{
					href: `/app/cases/${_case.id}/pip`,
					text: 'Summary',
					selected: id === 'summary'
				},
				{
					href: `/app/cases/${_case.id}/documents`,
					text: 'Case file',
					selected: id === 'casefile'
				},
				{
					href: `/app/cases/${_case.id}/timeline`,
					text: 'Timeline',
					selected: id === 'timeline'
				},
				{
					href: `/app/cases/${_case.id}/questions`,
					text: 'Questions',
					selected: id === 'questions'
				}
			];
		case 'divorce':
			return [
				{
					href: `/app/cases/${_case.id}/divorce`,
					text: 'Summary',
					selected: id === 'summary'
				},
				{
					href: `/app/cases/${_case.id}/divorce/parties`,
					text: 'Parties',
					selected: id === 'parties'
				},
				{
					href: `/app/cases/${_case.id}/documents`,
					text: 'Case file',
					selected: id === 'casefile'
				},
				{
					href: `/app/cases/${_case.id}/timeline`,
					text: 'Timeline',
					selected: id === 'timeline'
				}
			];
	}
}



function getCaseBarObject(_case) {
	return {
		parties: getPartiesLine(_case),
		id: _case.id
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

function removeItemFromArray(array, element) {
	const index = array.indexOf(element);
	if (index !== -1) {
		array.splice(index, 1);
	}
}

function getFormattedDate(m) {
	var date = moment(m);
	return date.format('D MMMM YYYY');
}

function getFormattedShortDate(m) {
	var date = moment(m);
	return date.format('D MMM YYYY');
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
	if(_case.events) {
		events = _case.events.sort((a, b) => {
			if(a.date < b.date) {
				return -1;
			}
			if(a.date > b.date) {
				return 1;
			}
			return 0;
		});
		events = events.reverse()
	}
	return events;
}


exports.getCaseBarObject = getCaseBarObject;
exports.getPartiesLine = getPartiesLine;
exports.getCase = getCase;
exports.getCaseType = getCaseType;
exports.getCaseTypeLabel = getCaseTypeLabel;
exports.getCaseActions = getCaseActions;
exports.getQuestion = getQuestion;
exports.isDraftQuestion = isDraftQuestion;
exports.removeQuestion = removeQuestion;
exports.removeItemFromArray = removeItemFromArray;
exports.getAppellantName = getAppellantName;
exports.getFormattedDate = getFormattedDate;
exports.getFormattedShortDate = getFormattedShortDate;
exports.getFormattedTime = getFormattedTime;
exports.getRecentEvents = getRecentEvents;
exports.getEvents = getEvents;
exports.getCaseNavItems = getCaseNavItems;