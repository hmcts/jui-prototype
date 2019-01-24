var types = require('./types');
var uuid = require('uuid/v4');
var moment = require('moment');

module.exports = [
  {
    id: 'FR1231612322',
    typeId: types.fr.id,
    status: '<a href="/app/cases/FR1231612322/documents/draft-consent-order">Draft consent order</a>',
    applicationDate: moment('2017-11-20 13:01'),
    lastAction: moment('2018-01-25 16:48'),
    tribunalCentre: 'East Midlands Regional Divorce Centre',
    requirements: 'Assisted Digital support requested',
    decreeDate: moment('2018-05-01 13:01'),
    absoluteData: moment('2018-08-11 11:01'),
    events: [
      {
        id: uuid(),
        date: moment('2018-09-04 13:37'),
        title: 'Consent order application submitted',
        by: 'Bernadette Jones, applicant’s solicitor'
      },
      {
        id: uuid(),
        date: moment('2018-09-04 15:33'),
        title: 'Draft consent order uploaded',
        by: 'Bernadette Jones, applicant’s solicitor'
      },
      {
        id: uuid(),
        date: moment('2018-09-04 15:34'),
        title: 'Joint statement of information uploaded',
        by: 'Bernadette Jones, applicant’s solicitor'
      },
      {
        id: uuid(),
        date: moment('2018-09-04 15:35'),
        title: 'Form A uploaded',
        by: 'Bernadette Jones, applicant’s solicitor'
      },
      {
        id: uuid(),
        date: moment('2018-09-06 09:21'),
        title: 'Case checked and ready for judge',
        by: 'Simon Saint, court administrator'
      },
      {
        id: uuid(),
        date: moment('2018-09-06 11:44'),
        title: 'Case referred to judge',
        by: 'Simon Saint, court administrator'
      },
      {
        id: uuid(),
        date: moment('2018-09-06 14:01'),
        title: 'Consent order not approved',
        by: 'DJ Nightingale'
      },
      {
        id: uuid(),
        date: moment('2018-09-07 09:15'),
        title: 'Directions order uploaded',
        by: 'Simon Saint, court administrator'
      },
      {
        id: uuid(),
        date: moment('2018-09-10 16:54'),
        title: 'Redrafted consent order uploaded',
        by: 'Bernadette Jones, applicant’s solicitor'
      },
      {
        id: uuid(),
        date: moment('2018-09-11 10:56'),
        title: 'Case referred to judge for 2nd time',
        by: 'Simon Saint, court administrator'
      },
      {
        id: uuid(),
        date: moment('2018-09-11 16:15'),
        title: 'Consent order approved',
        by: 'DJ Nightingale'
      },
      {
        id: uuid(),
        date: moment('2018-09-12 09:38'),
        title: 'Approved consent order uploaded',
        by: 'Simon Saint, court administrator'
      }
    ],

    applicant: [{
      fullname: 'Margaret Blake',
      dateOfBirth: moment('1987-02-20'),
      address: '7 Garrison Lane<br>Kingston<br>Surry<br>KT6 7GH',
      phone: '07700 900 772',
      email: 'john.smith@gmail.com',
      representative: ''
    }],

    respondent: [{
      fullname: 'William Blake',
      dateOfBirth: moment('1985-03-15'),
      address: '7 Garrison Lane<br>Kingston<br>Surry<br>KT6 7GH',
      phone: '07787 557 967',
      email: 'jane.smith@gmail.com',
      representative: ''
    }],

    parties: [
      {
        type: 'Applicant',
        firstName: 'Margaret',
        lastName: 'Blake',
        representative: {
          name: '',
          role: '',
          company: ''
        }
      },
      {
        type: 'Respondent',
        firstName: 'William',
        lastName: 'Blake',
        representative: {
          name: '',
          role: '',
          company: ''
        }
      }
    ],
    documents: [{
      id: 'draft-consent-order',
      label: 'Draft consent order'
    }, {
      id: '3',
      label: 'Statement of information (D81)'
    }, {
      id: '2',
      label: 'Form A'
    }, {
      id: '4',
      label: 'Grant of decree nisi'
    }],
    linkedCases: [{
      linkReason: 'Dependent case',
      linkPerson: 'Judge Shah',
      linkType: 'hard',
      typeId: types.divorce.id,
      id: 'BV18D00153',
      parties: [{
        type: 'Applicant',
        firstName: 'John',
        lastName: 'Smith',
        representative: {
          name: '',
          role: '',
          company: ''
        }
      },
      {
        type: 'Respondent',
        firstName: 'Jane',
        lastName: 'Smith',
        representative: {
          name: '',
          role: '',
          company: ''
        }
      }]
    }]
  },

  {
    id: 'SC1231612322',
    typeId: types.pip.id,
    status: '<a href="/app/cases/SC1231612322/questions/">Appellant’s answers</a>',
    applicationDate: moment('2017-11-20 13:01'),
    lastAction: moment('2018-01-25 16:48'),
    urgent: true,
    tribunalCentre: 'Fox Court',
    requirements: 'Assisted Digital support requested',
    linkedCases: [{
      linkReason: 'Dependent case',
      linkPerson: 'Judge Shah',
      linkType: 'hard',
      typeId: types.fr.id,
      id: 'FR1231612322',
      parties: [{
        type: 'Applicant',
        firstName: 'Margaret',
        lastName: 'Blake',
        representative: {
          name: '',
          role: '',
          company: ''
        }
      },
      {
        type: 'Respondent',
        firstName: 'William',
        lastName: 'Blake',
        representative: {
          name: '',
          role: '',
          company: ''
        }
      }]
    }],
    documents: [{
      id: '1-w',
      label: 'Personal independence payment'
    }, {
      id: '2-w',
      label: 'Decision notice'
    }],
    events: [
      {
        id: uuid(),
        date: moment('2018-07-30 14:48'),
        title: 'Appeal created',
        by: 'David Jones, court administrator'
      },

      {
        id: uuid(),
        date: moment('2018-07-31 09:15'),
        title: 'Evidence received',
        by: 'Susan Nolan, court administrator'
      },

      {
        id: uuid(),
        date: moment('2018-08-24 16:48'),
        title: 'Response submitted',
        by: 'DWP appeals officer'
      }
    ],
    rounds: [{
      id: uuid(),
      dateSent: null,
      questions: []
    },{
      id: uuid(),
      dateSent: moment('2018-05-28').toDate(),
      questions: [{
        id: uuid(),
        subject: 'How do you do your shopping?',
        body: '<p>Explain how you do your shopping. Include information about how often you go to the shops, how you get there and how you get your food from the shops to your home.</p>',
        author: 'Judge Prita Shah',
        dateChanged: moment('2018-05-28').toDate(),
        dateCreated: moment('2018-05-28').toDate(),
        attachments: [],
        response: {
          author: 'Appellant',
          date: new Date(),
          body: '<p>I have to walk to the bus stop, which is about 10 minutes from my house. I stop several times along the way. I can manage the bus, although getting off is very painful. I can only carry one bag, as my arms are too weak. I am exhasuted by the time I get home and in a lot of pain.</p>'
        }
      },
      {
        id: uuid(),
        subject: 'How do you prepare your meals?',
        body: '<p>Explain how you prepare your meals. Include information about the types of meals you eat, how you prepare them and whether there are any tasks in the kitchen you need assistance with.</p>',
        author: 'Judge Prita Shah',
        dateChanged: new Date(),
        attachments: [],
        response: {
          author: 'Appellant',
          date: moment('2018-05-28').toDate(),
          body: '<p>I only eat simple meals that I can put in the microwave. I find that I can\'t cut things with a knife as I do not have the strength.</p>'
        }
      },
      {
        id: uuid(),
        subject: 'How you wash yourself?',
        body: '<p>Explain how you wash yourself. Include information about whether you usually bath or shower.</p>',
        author: 'Judge Prita Shah',
        dateChanged: moment('2018-05-28').toDate(),
        dateCreated: moment('2018-05-28').toDate(),
        attachments: [],
        response: false
      }]
    }],
    parties: [
      {
        type: 'Appellant',
        firstName: 'Warren',
        lastName: 'Sutton',
        representative: null
      },
      {
        type: 'Respondent',
        org: 'DWP',
        office: '3',
        email: 'dwp@dwp.com',
        phone: '01838 787 637',
        decisionMaker: {
          firstName: 'Denise',
          lastName: 'Okenwe'
        },
        presentingOfficer: {
          firstName: 'Claire',
          lastName: 'Potter'
        }
      }
    ],
  },

  {
    id: 'SC1231612323',
    typeId: types.pip.id,
    documents: [{
      id: '1',
      label: 'Personal independence payment'
    }, {
      id: '2',
      label: 'Decision notice'
    }],
    rounds: [],
    parties: [
      {
        type: 'Appellant',
        firstName: 'Alan',
        lastName: 'Jones',
        representative: null
      },
      {
        type: 'Respondent',
        org: 'DWP',
        office: '3',
        email: 'dwp@dwp.com',
        phone: '01838 787 637',
        decisionMaker: {
          firstName: 'Denise',
          lastName: 'Okenwe'
        },
        presentingOfficer: {
          firstName: 'Claire',
          lastName: 'Potter'
        }
      }
    ],
    status: '<a href="/app/cases/SC1231612323/questions/">Appellant’s answers</a>',
    applicationDate: moment('2018-05-09'),
    lastAction: moment('2018-05-09'),
    urgent: false,
    tribunalCentre: 'Fox Court',
    requirements: 'Hearing loop required',
    events: [
      {
        id: uuid(),
        date: moment('2018-07-30 14:48'),
        title: 'Appeal created',
        by: 'David Jones, court administrator'
      },

      {
        id: uuid(),
        date: moment('2018-07-31 09:15'),
        title: 'Evidence received',
        by: 'Susan Nolan, court administrator'
      },

      {
        id: uuid(),
        date: moment('2018-08-24 16:48'),
        title: 'Response submitted',
        by: 'DWP appeals officer'
      }
    ],
  },

  {
    id: 'SC1231612324',
    typeId: types.pip.id,
    documents: [{
      id: '1',
      label: 'Personal independence payment'
    }, {
      id: '2',
      label: 'Decision notice'
    }],
    rounds: [],
    parties: [
      {
        type: 'Appellant',
        firstName: 'Jennifer',
        lastName: 'Langley',
        representative: null
      },
      {
        type: 'Respondent',
        org: 'DWP',
        office: '3',
        email: 'dwp@dwp.com',
        phone: '01838 787 637',
        decisionMaker: {
          firstName: 'Denise',
          lastName: 'Okenwe'
        },
        presentingOfficer: {
          firstName: 'Claire',
          lastName: 'Potter'
        }
      }
    ],
    status: '<a href="/app/cases/SC1231612324/questions/">Appellant’s answers</a>',
    applicationDate: moment('2018-05-09'),
    lastAction: moment('2018-05-09'),
    urgent: false,
    tribunalCentre: 'Fox Court',
    requirements: 'Hearing loop required',
    events: [
      {
        id: uuid(),
        date: moment('2018-07-30 14:48'),
        title: 'Appeal created',
        by: 'David Jones, court administrator'
      },

      {
        id: uuid(),
        date: moment('2018-07-31 09:15'),
        title: 'Evidence received',
        by: 'Susan Nolan, court administrator'
      },

      {
        id: uuid(),
        date: moment('2018-08-24 16:48'),
        title: 'Response submitted',
        by: 'DWP appeals officer'
      }
    ],
  },

  {
    id: 'BV18D00150',
    typeId: types.divorce.id,

    petitioner: [{
      fullname: 'Susan Francis',
      dateOfBirth: moment('1979-04-16'),
      address: '89 LONDON Road<br>Hinckley<br>LONDON<br>LE10 1HH',
      phone: '07700 900 772',
      email: 'susan.francis@gmail.com',
      representative: ''
    }],

    respondent: [{
      fullname: 'David Francis',
      dateOfBirth: moment('1981-06-07'),
      address: '24 Park Road<br>Lewisham<br>LONDON<br>E11 4PR',
      phone: '07787 557 967',
      email: 'david.francis@gmail.com',
      representative: ''
    }],

    parties: [
      {
        type: 'Petitioner',
        firstName: 'Susan',
        lastName: 'Francis',
        representative: {
          name: 'David Jones',
          role: 'Solicitor',
          company: 'Chadwick and Walters'
        }
      },
      {
        type: 'Respondent',
        firstName: 'David',
        lastName: 'Francis',
        representative: {
          name: 'Clive Walters',
          role: 'Solicitor',
          company: 'Chadwick and Walters'
        }
      }
    ],

    status: '<a href="/app/cases/BV18D00150/divorce/">Decree nisi application</a>',
    reason: 'Separated for 2 years and consent',
    applicationDate: moment('2018-05-09'),
    documents: [{
      id: 'key-facts',
      label: 'Key facts'
    }, {
      id: 'decree-nisi-application',
      label: 'Application for decree nisi'
    }],
    lastAction: moment('2018-05-09'),
    events: [
      {
        id: uuid(),
        date: moment('2018-02-27 13:01'),
        title: 'Application for decree nisi received',
        by: 'Susan Francis, petitioner'
      },
      {
        id: uuid(),
        date: moment('2018-04-16 15:22'),
        title: 'Acknowledgement of service by the court',
        by: 'David Francis, respondent'
      },
      {
        id: uuid(),
        date: moment('2018-04-24 14:10'),
        title: 'Application for divorce submitted',
        by: 'Susan Francis, petitioner'
      }
    ]
  },


  {
    id: 'BV18D06676',
    typeId: types.divorce.id,
    status: '<a href="/app/cases/BV18D06676/documents/draft-consent-order">Draft consent order</a>',
    applicationDate: moment('2017-11-20 13:01'),
    lastAction: moment('2018-01-25 16:48'),
    tribunalCentre: 'East Midlands Regional Divorce Centre',
    requirements: 'Assisted Digital support requested',
    decreeDate: moment('2018-05-01 13:01'),
    absoluteData: moment('2018-08-11 11:01'),
    events: [
      {
        id: uuid(),
        date: moment('2018-09-04 13:37'),
        title: 'Consent order application submitted',
        by: 'Bernadette Jones, applicant’s solicitor'
      },
      {
        id: uuid(),
        date: moment('2018-09-04 15:33'),
        title: 'Draft consent order uploaded',
        by: 'Bernadette Jones, applicant’s solicitor'
      },
      {
        id: uuid(),
        date: moment('2018-09-04 15:34'),
        title: 'Joint statement of information uploaded',
        by: 'Bernadette Jones, applicant’s solicitor'
      },
      {
        id: uuid(),
        date: moment('2018-09-04 15:35'),
        title: 'Form A uploaded',
        by: 'Bernadette Jones, applicant’s solicitor'
      },
      {
        id: uuid(),
        date: moment('2018-09-06 09:21'),
        title: 'Case checked and ready for judge',
        by: 'Simon Saint, court administrator'
      },
      {
        id: uuid(),
        date: moment('2018-09-06 11:44'),
        title: 'Case referred to judge',
        by: 'Simon Saint, court administrator'
      },
      {
        id: uuid(),
        date: moment('2018-09-06 14:01'),
        title: 'Consent order not approved',
        by: 'DJ Nightingale'
      },
      {
        id: uuid(),
        date: moment('2018-09-07 09:15'),
        title: 'Directions order uploaded',
        by: 'Simon Saint, court administrator'
      },
      {
        id: uuid(),
        date: moment('2018-09-10 16:54'),
        title: 'Redrafted consent order uploaded',
        by: 'Bernadette Jones, applicant’s solicitor'
      },
      {
        id: uuid(),
        date: moment('2018-09-11 10:56'),
        title: 'Case referred to judge for 2nd time',
        by: 'Simon Saint, court administrator'
      },
      {
        id: uuid(),
        date: moment('2018-09-11 16:15'),
        title: 'Consent order approved',
        by: 'DJ Nightingale'
      },
      {
        id: uuid(),
        date: moment('2018-09-12 09:38'),
        title: 'Approved consent order uploaded',
        by: 'Simon Saint, court administrator'
      }
    ],

    applicant: [{
      fullname: 'Paul Fox',
      dateOfBirth: moment('1987-02-20'),
      address: '7 Garrison Lane<br>Kingston<br>Surry<br>KT6 7GH',
      phone: '07700 900 772',
      email: 'john.smith@gmail.com',
      representative: ''
    }],

    respondent: [{
      fullname: 'Helen Fox',
      dateOfBirth: moment('1985-03-15'),
      address: '7 Garrison Lane<br>Kingston<br>Surry<br>KT6 7GH',
      phone: '07787 557 967',
      email: 'jane.smith@gmail.com',
      representative: ''
    }],

    parties: [
      {
        type: 'Applicant',
        firstName: 'Paul',
        lastName: 'Fox',
        representative: {
          name: '',
          role: '',
          company: ''
        }
      },
      {
        type: 'Respondent',
        firstName: 'Helen',
        lastName: 'Fox',
        representative: {
          name: '',
          role: '',
          company: ''
        }
      }
    ],
    documents: [{
      id: 'draft-consent-order',
      label: 'Draft consent order'
    }, {
      id: '3',
      label: 'Statement of information (D81)'
    }, {
      id: '2',
      label: 'Form A'
    }, {
      id: '4',
      label: 'Grant of decree nisi'
    }],
    linkedCases: [{
      linkReason: 'Dependent case',
      linkPerson: 'Judge Shah',
      linkType: 'hard',
      typeId: types.divorce.id,
      id: 'FR18D00153',
      parties: [{
        type: 'Applicant',
        firstName: 'John',
        lastName: 'Smith',
        representative: {
          name: '',
          role: '',
          company: ''
        }
      },
      {
        type: 'Respondent',
        firstName: 'Jane',
        lastName: 'Smith',
        representative: {
          name: '',
          role: '',
          company: ''
        }
      }]
    }]
  },

  {
    id: 'BV18D00153',
    typeId: types.divorce.id,
    linkedCases: [{
      type: 'Financial remedy',
      id: 'FR1231612322',
      parties: 'John Smith and Jane Smith'
    }],

    petitioner: [{
      fullname: 'John Smith',
      dateOfBirth: moment('1981-06-07'),
      address: '24 Park Road<br>Lewisham<br>LONDON<br>E11 4PR',
      phone: '07787 557 967',
      email: 'john.smith@gmail.com',
      representative: ''
    }],

    respondent: [{
      fullname: 'Jane Smith',
      dateOfBirth: moment('1979-04-16'),
      address: '89 LONDON Road<br>Hinckley<br>LONDON<br>LE10 1HH',
      phone: '07700 900 772',
      email: 'jane.smith@gmail.com',
      representative: ''
    }],

    parties: [
      {
        type: 'Petitioner',
        firstName: 'John',
        lastName: 'Smith',
        representative: {
          name: '',
          role: '',
          company: ''
        }
      },
      {
        type: 'Respondent',
        firstName: 'Jane',
        lastName: 'Smith',
        representative: {
          name: '',
          role: '',
          company: ''
        }
      }
    ],

    status: '<a href="#">Decree nisi application</a>',
    summaryStatus: '<a href="/app/cases/BV18D00153/documents/d84">Application for decree nisi received</a>',
    reason: 'Separated for 2 years and consent',
    applicationDate: moment('2018-05-09'),
    documents: [{
      id: 'd8',
      label: 'D8'
    }, {
      id: 'd84',
      label: 'D84'
    }],
    lastAction: moment('2018-05-09'),
    events: [
      {
        id: uuid(),
        date: moment('2018-02-27 13:01'),
        title: 'Application for decree nisi received',
        by: 'John Smith, petitioner'
      },
      {
        id: uuid(),
        date: moment('2018-04-24 15:22'),
        title: 'Acknowledgement of service by the court',
        by: 'Jane Smith, respondent'
      },
      {
        id: uuid(),
        date: moment('2018-04-25 14:10'),
        title: 'Application for divorce submitted',
        by: 'John Smith, petitioner'
      }
    ]
  },


  {
    id: 'BV18D00156',
    typeId: types.divorce.id,
    justBeenAssigned: true,
    linkedCases: [{
      linkReason: 'Dependent case',
      linkPerson: 'Judge Shah',
      linkType: 'hard',
      typeId: types.fr.id,
      id: 'FR1231612322',
      parties: [{
        type: 'Applicant',
        firstName: 'Margaret',
        lastName: 'Blake',
        representative: {
          name: '',
          role: '',
          company: ''
        }
      },
      {
        type: 'Respondent',
        firstName: 'William',
        lastName: 'Blake',
        representative: {
          name: '',
          role: '',
          company: ''
        }
      }]
    }],

    petitioner: [{
      fullname: 'Margaret Blake',
      dateOfBirth: moment('1981-06-07'),
      address: '24 Park Road<br>Lewisham<br>LONDON<br>E11 4PR',
      phone: '07787 557 967',
      email: 'margaret.blake@gmail.com',
      representative: ''
    }],

    respondent: [{
      fullname: 'William Blake',
      dateOfBirth: moment('1979-04-16'),
      address: '89 LONDON Road<br>Hinckley<br>LONDON<br>LE10 1HH',
      phone: '07700 900 772',
      email: 'william.blake@gmail.com',
      representative: ''
    }],

    parties: [
      {
        type: 'Petitioner',
        firstName: 'Margaret',
        lastName: 'Blake',
        representative: {
          name: '',
          role: '',
          company: ''
        }
      },
      {
        type: 'Respondent',
        firstName: 'William',
        lastName: 'Blake',
        representative: {
          name: '',
          role: '',
          company: ''
        }
      }
    ],

    status: '<a href="/app/cases/BV18D00156/documents/d84">Decree nisi application</a>',
    summaryStatus: '<a href="/app/cases/BV18D00156/documents/d84">Application for decree nisi received</a>',
    reason: 'Separated for 2 years and consent',
    applicationDate: moment('2018-05-09'),
    documents: [{
      id: 'd84',
      label: 'Decree nisi application (D84)'
    },
    {
      id: 'd8',
      label: 'Divorce application (D8)'
    }],
    lastAction: moment('2018-05-09'),
    events: [
      {
        id: uuid(),
        date: moment('2018-02-27 13:01'),
        title: 'Application for decree nisi received',
        by: 'Margaret Blake, petitioner'
      },
      {
        id: uuid(),
        date: moment('2018-04-24 15:22'),
        title: 'Acknowledgement of service by the court',
        by: 'William Blake, respondent'
      },
      {
        id: uuid(),
        date: moment('2018-04-16 14:10'),
        title: 'Case assigned to you',
        reason: 'Case assigned to you',
        by: 'Jane Doe, District Judge'
      }
    ]
  }

];
